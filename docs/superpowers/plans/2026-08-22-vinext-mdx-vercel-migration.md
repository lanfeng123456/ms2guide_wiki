# Vinext/Vite + MDX + Vercel Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or **superpowers:executing-plans** to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 21 个攻略在 4 种语言下的页面内容迁移到 MDX，并切换到 Vinext/Vite + Nitro 的 Vercel 构建，同时保持现有页面内容、URL、SEO、广告和视觉结构不变。

**Architecture:** 使用 `src/content/guides/{locale}/*.mdx` 保存攻略 frontmatter 和正文；使用 Vite `import.meta.glob(...?raw)` 建立静态内容索引，再用 typed parser 将 MDX 文档归一化为现有 `InnerPageRecord`，让现有页面组件继续负责展示。Vinext 和 Nitro 负责 App Router 兼容层与 Vercel `.output` 产物，路由和 SEO 数据流保持原有结构。

**Tech Stack:** React、Next.js App Router API、Vinext、Vite、Nitro、TypeScript、MDX syntax、`gray-matter`、`unified`、`remark-parse`、`remark-mdx`、Vitest、Vercel。

**Spec:** `docs/superpowers/specs/2026-08-22-vinext-mdx-vercel-architecture-design.md`

## Global Constraints

- 保持现有 21 个 slug、4 种语言和现有公开 URL 不变。
- 攻略页面总数必须保持 84，sitemap 必须保持 90 个 HTTPS URL。
- 公开页面正文必须从当前 `src/data/inner-pages.ts` 与 locale translations 迁移，不能用 `内页素材/*.md` 研究笔记替换。
- `src/components/inner-page.tsx` 继续接收标准化 `InnerPageRecord`，不直接读取 MDX 文件。
- `NEXT_PUBLIC_SITE_URL` 继续使用 `https://www.ms2guide.site`，canonical、Open Graph、robots 和 sitemap 不得回退到 HTTP 或非 www 主机名。
- 现有两个广告位、图片、字体、导航、相关链接和页面结构必须保留。
- 在 Vinext/Vite/Nitro 构建和 Preview 验证通过前，不删除旧内容注册表或切换 Production。
- 每个任务完成后运行任务内指定测试并单独提交，提交前使用 `git diff --check`。
- 实施代码前必须阅读仓库 `AGENTS.md` 中要求的 Next.js 兼容文档，尤其是 `node_modules/next/dist/docs/` 中与 App Router、metadata 和构建相关的文档。

---

### Task 1: 建立 MDX 文档类型、解析器和失败测试

**Files:**
- Create: `src/lib/content/schema.ts`
- Create: `src/lib/content/parse-guide.ts`
- Create: `src/lib/content/parse-guide.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: 一个 MDX source string 和 source path。
- Produces: `parseGuideDocument(source: string, sourcePath: string): GuideDocument`。
- `GuideDocument` 至少包含 `record: InnerPageRecord & { locale: GuideLocale }`、`sourcePath` 和 `body`。
- `record.sections` 由 MDX 正文的二级标题、首段和无序列表生成。

- [ ] **Step 1: 安装解析依赖并写失败测试**

```powershell
npm install gray-matter unified remark-parse remark-mdx
```

测试必须覆盖完整文档、缺少必填字段和 section 结构错误：

```ts
const result = parseGuideDocument(source, "src/content/guides/en/example.mdx");
expect(result.record.sections).toEqual([{
  title: "Verified details",
  intro: "This section is checked.",
  bullets: ["First detail", "Second detail"],
}]);
expect(() => parseGuideDocument("---\ntitle: incomplete\n---", "broken.mdx"))
  .toThrow(/slug|locale|status/i);
```

- [ ] **Step 2: 运行测试确认先失败**

```powershell
npx vitest run src/lib/content/parse-guide.test.ts
```

预期：FAIL，因为 parser 和 schema 尚未实现。

- [ ] **Step 3: 实现 schema 和 parser**

在 `schema.ts` 中定义 `supportedGuideLocales = ["en", "de", "fr", "pt-br"] as const`、`GuideLocale`、`GuideFrontmatter` 和 `GuideDocument`。校验 `status` 只能是 `Verified`、`Beta evidence` 或 `Update watch`，并校验 sources、related、locale 和所有必填字段。

在 `parse-guide.ts` 中用 `gray-matter` 读取 frontmatter，用 `unified().use(remarkParse).use(remarkMdx)` 读取正文 AST；只接受每个 section 的 `## heading`、一个段落和一个或多个 list item，异常必须包含 source path。

- [ ] **Step 4: 运行测试确认通过**

```powershell
npx vitest run src/lib/content/parse-guide.test.ts
```

预期：解析、必填字段和 section 错误测试全部 PASS。

- [ ] **Step 5: 提交**

```powershell
git diff --check
git add package.json package-lock.json src/lib/content/schema.ts src/lib/content/parse-guide.ts src/lib/content/parse-guide.test.ts
git commit -m "feat: add typed mdx guide parser"
```

### Task 2: 建立 Vite 内容索引和单篇 MDX 接入

**Files:**
- Create: `src/content/guides/en/mortal-shell-ii-guide.mdx`
- Create: `src/lib/content/guides.ts`
- Create: `src/lib/content/guides.test.ts`

**Interfaces:**
- Consumes: Task 1 的 `parseGuideDocument` 和 `GuideDocument`。
- Produces: `getGuide(slug: string, locale: GuideLocale): GuideDocument | undefined`。
- Produces: `getGuideParams(): Array<{ slug: string; locale: GuideLocale }>`。
- Produces: `getGuideRecords(): Array<GuideDocument>`。

- [ ] **Step 1: 写内容索引失败测试**

```ts
it("loads the English guide fixture by locale and slug", () => {
  expect(getGuide("mortal-shell-ii-guide", "en")?.record.title)
    .toBe("Mortal Shell II guide");
});

it("exposes indexed params and records", () => {
  expect(getGuideParams()).toContainEqual({ slug: "mortal-shell-ii-guide", locale: "en" });
  expect(getGuideRecords()).toHaveLength(1);
});
```

- [ ] **Step 2: 运行测试确认先失败**

```powershell
npx vitest run src/lib/content/guides.test.ts
```

预期：FAIL，因为 fixture 和 `guides.ts` 尚不存在。

- [ ] **Step 3: 创建 fixture 并实现 Vite glob 索引**

创建单篇 MDX fixture，字段和正文必须与 `getInnerPage("mortal-shell-ii-guide", "en")` 一致，不得从 `内页素材/Mortal Shell II guide.md` 复制研究笔记。

在 `guides.ts` 使用：

```ts
const guideSources = import.meta.glob("../../content/guides/**/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;
```

对每个 source 调用 parser，用 `${locale}:${slug}` 建立索引；重复 key 必须抛错。`getGuideParams()` 返回稳定排序结果。

- [ ] **Step 4: 运行测试确认通过**

```powershell
npx vitest run src/lib/content/guides.test.ts
```

预期：fixture 查询和索引数量测试 PASS。

- [ ] **Step 5: 提交**

```powershell
git diff --check
git add src/content/guides/en/mortal-shell-ii-guide.mdx src/lib/content/guides.ts src/lib/content/guides.test.ts
git commit -m "feat: index guide mdx content"
```

### Task 3: 从现有 TS 数据生成全部 84 篇 MDX

**Files:**
- Create: `scripts/generate-guide-mdx.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/content/guides/en/*.mdx`, `de/*.mdx`, `fr/*.mdx`, `pt-br/*.mdx`（共 84 篇）
- Modify: `src/lib/content/guides.test.ts`

**Interfaces:**
- Consumes: `innerPageSlugs`、`getInnerPage(slug, locale)`、`locales` 和 `InnerPageRecord`。
- Produces: 每个 locale/slug 一个可重复生成的 MDX 文件，字段和 section 顺序与旧页面一致。
- Produces: `npm run content:generate`，执行后断言文件数为 84。

- [ ] **Step 1: 写全量等价失败测试**

```ts
it("indexes every legacy guide in every supported locale", () => {
  expect(getGuideRecords()).toHaveLength(innerPageSlugs.length * locales.length);
  for (const locale of locales) {
    for (const slug of innerPageSlugs) {
      expect(getGuide(slug, locale)?.record).toMatchObject(getInnerPage(slug, locale)!);
    }
  }
});
```

- [ ] **Step 2: 运行测试确认先失败**

```powershell
npx vitest run src/lib/content/guides.test.ts
```

预期：FAIL，因为当前只有 1 篇 fixture。

- [ ] **Step 3: 实现生成器并生成内容**

安装 `tsx`：

```powershell
npm install -D tsx
```

生成器遍历 `locales` 和 `innerPageSlugs`，调用 `getInnerPage`，将 frontmatter scalar 用 `JSON.stringify` 编码，将 `related` 和 `sources` 输出为合法 YAML inline arrays，并按旧 `sections` 顺序写出 `## title`、intro 和 bullet list。只能写入 `src/content/guides`，不能修改 `内页素材`。

添加 script：

```json
"content:generate": "tsx scripts/generate-guide-mdx.ts"
```

- [ ] **Step 4: 生成并验证 84 篇**

```powershell
npm run content:generate
npx vitest run src/lib/content/guides.test.ts
```

预期：生成 84 篇 MDX，所有旧数据与新数据的全量等价测试 PASS。

- [ ] **Step 5: 提交**

```powershell
git diff --check
git add package.json package-lock.json scripts/generate-guide-mdx.ts src/content/guides src/lib/content/guides.test.ts
git commit -m "content: migrate guides to mdx"
```

### Task 4: 接入攻略路由并保持页面渲染接口

**Files:**
- Modify: `src/app/guides/[slug]/page.tsx`
- Modify: `src/app/[locale]/guides/[slug]/page.tsx`
- Create: `src/app/guide-content.test.ts`
- Modify: `src/components/inner-page.tsx` only if locale-normalized props require it

**Interfaces:**
- Consumes: `getGuide`、`getGuideParams` 和 `GuideDocument.record`。
- Produces: 英文及多语言攻略路由继续返回现有页面组件和 metadata。

- [ ] **Step 1: 写路由内容来源测试**

```ts
it("resolves every generated route from MDX", () => {
  const params = getGuideParams();
  expect(params).toHaveLength(84);
  expect(params.every(({ slug, locale }) => getGuide(slug, locale))).toBe(true);
});
```

- [ ] **Step 2: 运行测试确认先失败**

```powershell
npx vitest run src/app/guide-content.test.ts
```

预期：FAIL，路由尚未使用新的内容索引。

- [ ] **Step 3: 修改两个攻略路由**

用 `getGuideParams()` 生成静态参数，用 `getGuide(slug, "en")` 或 `getGuide(slug, locale)` 查询 record，保留现有 `notFound()`、metadata 字段、canonical 路径和 `InnerPage` props。路由不得直接读取 MDX 文件或重复解析正文。

- [ ] **Step 4: 运行路由、组件和 SEO 测试**

```powershell
npx vitest run src/app/guide-content.test.ts src/components/inner-page.test.tsx src/app/seo.test.ts
```

预期：所有相关测试 PASS。

- [ ] **Step 5: 提交**

```powershell
git diff --check
git add src/app/guides/[slug]/page.tsx src/app/[locale]/guides/[slug]/page.tsx src/app/guide-content.test.ts src/components/inner-page.tsx
git commit -m "feat: serve guide routes from mdx"
```

### Task 5: 切换 sitemap、静态参数和内容计数到新索引

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts` only if the new build changes its route-handler signature
- Modify: `src/app/seo.test.ts`

**Interfaces:**
- Consumes: `getGuideParams()` and `siteConfig.siteUrl`。
- Produces: `sitemap()` 返回 90 个 URL，所有 URL 以 `https://www.ms2guide.site/` 开头。

- [ ] **Step 1: 写 sitemap 等价测试**

```ts
it("keeps the sitemap at 90 HTTPS URLs after MDX migration", async () => {
  const entries = await sitemap();
  expect(entries).toHaveLength(90);
  expect(entries.every((entry) => entry.url.startsWith("https://www.ms2guide.site/"))).toBe(true);
  expect(entries.filter((entry) => entry.url.includes("/guides/")).length).toBe(84);
});
```

- [ ] **Step 2: 运行测试确认差异**

```powershell
npx vitest run src/app/seo.test.ts
```

预期：若旧 sitemap 仍枚举旧 registry，测试报告 URL 数量或来源差异。

- [ ] **Step 3: 修改 sitemap 数据来源**

保留首页、locale 首页和法律页面路径，将攻略路径改为从 `getGuideParams()` 生成；不要手写 slug 列表，不要改变 `siteConfig.siteUrl`。robots 继续输出 `Sitemap: https://www.ms2guide.site/sitemap.xml`。

- [ ] **Step 4: 运行全量测试**

```powershell
npm test
```

预期：所有 Vitest 测试 PASS，sitemap、robots、canonical 和 Open Graph 断言保持通过。

- [ ] **Step 5: 提交**

```powershell
git diff --check
git add src/app/sitemap.ts src/app/robots.ts src/app/seo.test.ts
git commit -m "test: preserve seo urls during mdx migration"
```

### Task 6: 接入 Vinext、Vite 和 Nitro，并验证本地生产构建

**Files:**
- Create: `vite.config.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/vite-build.test.ts`
- Read before editing: `AGENTS.md` and relevant files under `node_modules/next/dist/docs/`
- Keep unchanged initially: `next.config.ts`

**Interfaces:**
- Consumes: 现有 `src/app` 路由、MDX route data flow 和 SEO handlers。
- Produces: `npm run dev` 使用 Vite，`npm run build` 生成 Nitro `.output`，`npm run start` 能预览生产产物。

- [ ] **Step 1: 阅读兼容文档并写失败配置测试**

```powershell
Get-Content -Raw AGENTS.md
Get-ChildItem node_modules/next/dist/docs -Recurse -File | Select-Object -ExpandProperty FullName
```

阅读 App Router、metadata、静态参数、构建和 route handlers 相关文档。创建 `src/vite-build.test.ts`，验证 `vite.config.ts` 导出配置含 Vinext 和 Nitro plugins；配置不存在时测试必须失败。

- [ ] **Step 2: 运行测试确认先失败**

```powershell
npx vitest run src/vite-build.test.ts
```

预期：FAIL，因为配置尚不存在。

- [ ] **Step 3: 安装并配置 Vinext/Nitro**

```powershell
npm install vinext nitro
npm install -D cross-env
```

创建 `vite.config.ts`：

```ts
import { defineConfig } from "vite";
import vinext from "vinext";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [vinext(), nitro()],
});
```

更新 scripts：

```json
{
  "dev": "vite dev",
  "build": "vite build",
  "build:vercel": "cross-env NITRO_PRESET=vercel vite build",
  "start": "nitro preview",
  "test": "vitest run",
  "content:generate": "tsx scripts/generate-guide-mdx.ts"
}
```

初始阶段保留 `next` 依赖和 `next.config.ts`，因为当前页面仍使用 `next/image`、`next/font` 和 Next 类型；只有实际构建证明不需要时才移除。

- [ ] **Step 4: 运行配置测试和本地生产构建**

```powershell
npx vitest run src/vite-build.test.ts
npm run build:vercel
```

预期：配置测试 PASS；构建生成 `.output`，没有未解析 MDX、动态路由或 metadata 错误。若失败，先修正兼容适配，不删除旧 Next 配置。

- [ ] **Step 5: 提交**

```powershell
git diff --check
git add vite.config.ts package.json package-lock.json src/vite-build.test.ts
git commit -m "build: add vinext nitro vercel pipeline"
```

### Task 7: 验证图片、字体、广告和生产页面输出

**Files:**
- Create: `scripts/check-production-output.mjs`
- Modify: `package.json`
- Modify: `src/app/page.test.tsx` only for stable build assertions
- Modify: `src/components/adsterra-banner.test.tsx` only if both existing scripts need explicit assertions

**Interfaces:**
- Consumes: `.output` from Task 6 and existing component/SEO tests。
- Produces: `npm run check:production`，检查关键路由、metadata、sitemap、robots 和广告标记。

- [ ] **Step 1: 写生产产物检查**

脚本必须在缺少 `.output`、路由响应不是 2xx、canonical/og:url 缺失、广告容器缺失、sitemap 非 HTTPS 或出现 `http://www.ms2guide.site` 时以非零状态退出。检查 URL：

```js
const urls = [
  "/",
  "/guides/mortal-shell-ii-guide",
  "/de/guides/mortal-shell-ii-guide",
  "/robots.txt",
  "/sitemap.xml",
];
```

添加 script：

```json
"check:production": "node scripts/check-production-output.mjs"
```

- [ ] **Step 2: 运行检查确认先失败**

```powershell
npm run check:production
```

预期：在脚本或 `.output` 未准备好时 FAIL，并报告缺少项。

- [ ] **Step 3: 完成检查并验证运行时能力**

读取 Nitro 产物；对于动态页面，启动 `nitro preview` 后用 Node `fetch` 检查上述 URL。HTML 页面必须包含标题、canonical、Open Graph 和现有广告标识；XML/text 路由必须返回正确内容类型。显式检查 `next/image`、`next/font/google` 产物没有造成页面错误。

- [ ] **Step 4: 运行全部验证**

```powershell
npm test
npm run build:vercel
npm run check:production
```

预期：测试、Vercel preset 构建和生产检查全部 PASS。

- [ ] **Step 5: 提交**

```powershell
git diff --check
git add package.json scripts/check-production-output.mjs src/app/page.test.tsx src/components/adsterra-banner.test.tsx
git commit -m "test: verify vinext production output"
```

### Task 8: Vercel Preview 验证、切换准备和旧 registry 清理门槛

**Files:**
- Modify: `package.json` only if the verified Vercel command differs from Task 6
- Modify: `docs/superpowers/specs/2026-08-22-vinext-mdx-vercel-architecture-design.md` only to record an observed compatibility boundary
- Delete only after Production verification: `src/data/inner-pages.ts`, `src/data/inner-pages.test.ts` if no remaining import exists

**Interfaces:**
- Consumes: Task 7 的绿色测试和 `.output`。
- Produces: Vercel Preview 可验证的构建配置；旧正文 registry 只有在内容等价性、Preview 和正式域名验证都通过后才清理。

- [ ] **Step 1: 检查清理前引用**

```powershell
rg -n "innerPages|getInnerPage|innerPageSlugs|data/inner-pages" src scripts
```

预期：运行时页面、sitemap 和 loader 只使用 `src/lib/content/guides.ts`；剩余引用只能出现在 parity 测试或生成脚本中。仍有运行时引用时，先迁移并重跑 Task 3-7 测试。

- [ ] **Step 2: 创建 Vercel Preview**

Vercel 项目使用：

- Build command：`npm run build:vercel`，或 Vercel 环境中等价的 `vite build`；
- Output directory：`.output`；
- Environment variable：`NEXT_PUBLIC_SITE_URL=https://www.ms2guide.site`。

Preview 检查 `/`、英文攻略、`/de/`、`/fr/`、`/pt-br/` 攻略、`/robots.txt` 和 `/sitemap.xml`，每个返回 2xx；sitemap 为有效 XML，canonical 不出现 HTTP 或非 www 生产 URL。

- [ ] **Step 3: Production 切换前运行最终本地检查**

```powershell
npm test
npm run build:vercel
npm run check:production
git diff --check
```

预期：全部 PASS，工作区只有预期迁移文件。

- [ ] **Step 4: 正式域名验证后清理旧注册表**

Vercel Production 部署成功并通过正式域名检查后，确认没有运行时依赖，再删除旧正文 registry 和仅服务于旧 registry 的测试；保留生成器所需的等价性保护，不能因清理而失去内容回归测试。

- [ ] **Step 5: 清理后全量验证并提交**

```powershell
npm test
npm run build:vercel
npm run check:production
git diff --check
git add -A
git commit -m "refactor: complete mdx vercel migration"
```

预期：清理后仍有 84 篇攻略、90 条 sitemap URL、所有测试和 Vercel preset 构建全部通过。

## Self-Review Checklist

- [x] Spec 的目标架构、内容迁移边界、SEO、广告、Vercel 构建、Preview 验证和回滚要求均有对应任务。
- [x] 每个任务包含明确文件路径、接口、失败测试、实现步骤、验证命令和提交命令。
- [x] Task 1 的 `GuideDocument`、Task 2 的 `getGuide`/`getGuideParams`、Task 4 的路由调用和 Task 5 的 sitemap 调用保持类型与命名一致。
- [x] 计划明确保留旧 registry 到正式验证后，避免无法回滚。
- [x] 计划没有把研究素材文件当作公开页面正文来源，也没有添加 OpenAI Sites 或 Cloudflare 配置。
- [x] 计划包含构建失败、字体/图片兼容性和 Vercel Preview 的验证门槛。
