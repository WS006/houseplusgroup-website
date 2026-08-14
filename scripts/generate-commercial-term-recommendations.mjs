import { readFile, writeFile } from 'node:fs/promises';

const source = await readFile(new URL('../lib/product-data.ts', import.meta.url), 'utf8');
const output = new URL('../audit/product-commercial-term-recommendations-2026-08-14.md', import.meta.url);
const blocks = [...source.matchAll(/^  '([^']+)': \{([\s\S]*?)(?=^  '[^']+': \{|^};$)/gm)];

const products = blocks.map(([, slug, block]) => {
  const name = block.match(/name: '([^']+)'/)?.[1] || slug;
  const category = block.match(/category: '([^']+)'/)?.[1] || 'unclassified';
  const b2b = block.match(/b2bInfo:\s*\{([\s\S]*?)\n\s*\},/)?.[1];
  const value = (key) => b2b?.match(new RegExp(`${key}:\\s*'([^']+)'`))?.[1] || null;
  const certifications = b2b?.match(/certifications:\s*\[([^\]]*)\]/)?.[1]?.match(/'([^']+)'/g)?.map((item) => item.slice(1, -1)) || [];
  return { slug, name, category, terms: b2b ? { moq: value('moq'), leadTime: value('leadTime'), warranty: value('warranty'), certifications } : null };
});

function frequency(values) {
  const rows = [...Object.entries(Object.groupBy(values.filter(Boolean), (value) => value))]
    .map(([value, items]) => ({ value, count: items.length }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
  return { rows, total: rows.reduce((sum, item) => sum + item.count, 0) };
}

function mode(values) {
  const { rows, total } = frequency(values);
  return rows[0] ? { ...rows[0], share: rows[0].count / total } : null;
}

function leadRange(values) {
  const days = values.map((value) => value?.match(/(\d+)\s*[-–]\s*(\d+)/)).filter(Boolean).map((match) => [Number(match[1]), Number(match[2])]);
  return days.length ? `${Math.min(...days.map(([low]) => low))}–${Math.max(...days.map(([, high]) => high))} days` : null;
}

const groups = new Map();
for (const product of products) {
  const group = groups.get(product.category) || { confirmed: [], missing: [] };
  group[product.terms ? 'confirmed' : 'missing'].push(product);
  groups.set(product.category, group);
}

const sections = [...groups.entries()].map(([category, { confirmed, missing }]) => {
  const terms = confirmed.map((product) => product.terms);
  const moq = mode(terms.map((term) => term.moq));
  const lead = mode(terms.map((term) => term.leadTime));
  const warranty = mode(terms.map((term) => term.warranty));
  const certifications = frequency(terms.flatMap((term) => term.certifications));
  const n = confirmed.length;
  const confidence = (item) => item ? (item.share >= 0.8 ? '高' : item.share >= 0.5 ? '中' : '低') : '无样本';
  const commonCerts = certifications.rows.filter((item) => item.count === n).map((item) => item.value).join(', ') || '无完全一致认证组合';
  const recommendation = {
    moq: moq ? `${moq.value}（众数：${moq.count}/${n}，${confidence(moq)}置信）` : '保持报价确认',
    lead: lead ? `${leadRange(terms.map((term) => term.leadTime))}（众数：${lead.value}，${lead.count}/${n}，${confidence(lead)}置信）` : '保持报价确认',
    warranty: warranty ? `${warranty.value}（${warranty.count}/${n}，${confidence(warranty)}置信）` : '保持报价确认',
    certifications: commonCerts,
  };
  const itemRows = missing.map((product) => `| ${product.name} | ${product.slug} | ${recommendation.moq} | ${recommendation.lead} | ${recommendation.warranty} | ${recommendation.certifications} |`).join('\n');
  return `## ${category}\n\n样本量：${n} 个已配置产品；待补全：${missing.length} 个产品。\n\n| 待补全产品 | slug | 建议 MOQ | 建议交期 | 建议保修 | 建议认证 |\n|---|---|---|---|---|---|\n${itemRows}\n\n> 该表是基于 HousePlus 当前 ${n} 个同类产品的内部统计推荐，不是外部市场数据，也不是对外承诺。MOQ 和交期若置信为“低”或“中”，建议继续标为报价确认，直到产品/采购负责人确认。\n\n`;
}).join('\n');

const report = `# 缺固定商业资料产品：内部统计推荐\n\n**生成日期：** 2026-08-14\n\n## 方法与边界\n\n本分析只使用 HousePlus 当前产品基础数据中 **45 个已配置产品** 的真实 MOQ、交期、保修与认证字段。它不是外部“大数据”、行业报价或供应链承诺。推荐值使用分类内众数、实际交期范围、统一保修比例和完全一致认证集合计算；任何推荐值必须在你确认后才可写入公开产品页。\n\n${sections}\n## 发布建议\n\n1. 保修与分类内全部样本一致的认证可优先由负责人确认。\n2. MOQ 与交期存在多个档位时，推荐值只用于内部定价/采购复核，公开页面应继续使用“以报价确认”。\n3. 确认后可按分类批量写入；特殊型号应单独覆盖，不影响其他产品。\n`;

await writeFile(output, report);
console.log(JSON.stringify({ output: output.pathname, totalProducts: products.length, confirmedProducts: products.filter((product) => product.terms).length, missingProducts: products.filter((product) => !product.terms).length }, null, 2));
