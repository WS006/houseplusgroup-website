import { readFile, writeFile } from 'node:fs/promises';

const source = await readFile(new URL('../lib/product-data.ts', import.meta.url), 'utf8');
const output = new URL('../audit/product-commercial-term-standard-analysis-2026-08-14.md', import.meta.url);
const blocks = [...source.matchAll(/^  '([^']+)': \{([\s\S]*?)(?=^  '[^']+': \{|^};$)/gm)];

const products = blocks.map(([, slug, block]) => {
  const name = block.match(/name: '([^']+)'/)?.[1] || slug;
  const category = block.match(/category: '([^']+)'/)?.[1] || 'unclassified';
  const b2b = block.match(/b2bInfo:\s*\{([\s\S]*?)\n\s*\},/)?.[1];
  const value = (key) => b2b?.match(new RegExp(`${key}:\\s*'([^']+)'`))?.[1] || null;
  const certifications = b2b?.match(/certifications:\s*\[([^\]]*)\]/)?.[1]?.match(/'([^']+)'/g)?.map((item) => item.slice(1, -1)) || [];
  return { slug, name, category, terms: b2b ? { moq: value('moq'), leadTime: value('leadTime'), warranty: value('warranty'), certifications } : null };
});

const count = (values) => Object.entries(Object.groupBy(values.filter(Boolean), (value) => value)).sort((a, b) => b[1].length - a[1].length).map(([value, occurrences]) => `${value} (${occurrences.length})`).join('; ') || '无';
const categories = [...new Set(products.map(({ category }) => category))];
const sections = categories.map((category) => {
  const all = products.filter((product) => product.category === category);
  const confirmed = all.filter((product) => product.terms);
  const missing = all.filter((product) => !product.terms);
  const terms = confirmed.map(({ terms }) => terms);
  const isUniform = (field) => new Set(terms.map((item) => item[field]).filter(Boolean)).size === 1;
  const certificationValues = terms.flatMap(({ certifications }) => certifications);
  const safeRule = ['moq', 'leadTime', 'warranty'].every(isUniform) && new Set(certificationValues).size > 0;
  const missingRows = missing.map(({ name, slug }) => `| ${name} | ${slug} |`).join('\n');
  return `## ${category}\n\n| 项目 | 已有产品资料分布 |\n|---|---|\n| 有固定资料产品 | ${confirmed.length}/${all.length} |\n| MOQ | ${count(terms.map(({ moq }) => moq))} |\n| 交期 | ${count(terms.map(({ leadTime }) => leadTime))} |\n| 保修 | ${count(terms.map(({ warranty }) => warranty))} |\n| 认证 | ${count(certificationValues)} |\n| 是否可作为分类统一候选 | ${safeRule ? '存在单一模式，仍需用户确认该模式适用于缺资料型号。' : '存在多种模式，不可按分类直接复制，需逐型号确认。'} |\n\n### 缺资料产品\n\n| 产品 | slug |\n|---|---|\n${missingRows}\n`;
}).join('\n');

const report = `# HousePlus 缺固定商业资料产品：分类标准分析\n\n**生成日期：** 2026-08-14\n\n本报告只比较现有产品基础数据，不推断缺资料型号的 MOQ、交期、保修或认证。只有当同类资料呈现单一模式且负责人确认该模式适用于缺资料型号时，才可批量写入。\n\n${sections}\n\n## 确认方式\n\n请按分类或按产品回复以下任一形式：\n\n1. “太阳能缺资料产品采用：MOQ X；交期 X；保修 X；认证 X”。\n2. “以下产品例外：slug → MOQ / 交期 / 保修 / 认证”。\n3. “保持按报价确认”，则不会写入固定数值。\n`;
await writeFile(output, report);
console.log(JSON.stringify({ totalProducts: products.length, missingProducts: products.filter((product) => !product.terms).length, output: output.pathname }, null, 2));
