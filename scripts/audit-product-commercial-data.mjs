import { readFile, writeFile } from 'node:fs/promises';

const sourcePath = new URL('../lib/product-data.ts', import.meta.url);
const outputPath = new URL('../audit/product-commercial-data-completion-template.md', import.meta.url);
const source = await readFile(sourcePath, 'utf8');

const blocks = [...source.matchAll(/^  '([^']+)': \{([\s\S]*?)(?=^  '[^']+': \{|^};$)/gm)];
const missing = blocks.map(([, slug, block]) => {
  const name = block.match(/name: '([^']+)'/)?.[1] || slug;
  const category = block.match(/category: '([^']+)'/)?.[1] || 'unclassified';
  const hasB2BInfo = /b2bInfo:\s*\{/.test(block);
  return { slug, name, category, hasB2BInfo };
}).filter((product) => !product.hasB2BInfo);

const grouped = Object.groupBy(missing, ({ category }) => category);
const rows = Object.entries(grouped).flatMap(([category, products]) =>
  products.map(({ slug, name }) => `| ${category} | ${name} | ${slug} |  |  |  |  |  |`),
);

const document = `# HousePlus 产品商业资料补全模板

**生成日期：** 2026-08-14

以下产品当前没有固定的 MOQ、交期、保修或适用认证记录。因此，网站会继续显示“按报价确认”，不会推断或复制其他型号的数据。请由产品、采购或合规负责人按型号填写；同一分类只有在确实采用同一标准时才可批量确认。

| 分类 | 产品 | 路由 slug | 标准 MOQ | 标准交期 | 标准保修 | 适用认证 | 资料来源/负责人 |
|---|---|---|---|---|---|---|---|
${rows.join('\n')}

## 填写规则

1. MOQ 使用明确单位，例如 100 pcs；不适用时填写 N/A，不要留空。
2. 交期应说明其适用前提，例如 20–25 days after deposit；若受库存或配置影响，请注明。
3. 保修应使用明确期限及边界，例如 12-month limited warranty。
4. 认证仅填写该型号和目标市场确实适用、且可提供资料的项目。
5. 最后一列记录证据文件、资料链接或确认负责人。完成后，可将这些字段安全写回 lib/product-data.ts 的 b2bInfo。
`;

await writeFile(outputPath, document);
console.log(JSON.stringify({ totalProducts: blocks.length, productsMissingFixedCommercialData: missing.length, output: outputPath.pathname }, null, 2));
