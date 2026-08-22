# Mortal Shell II Wiki：Vinext/Vite + MDX + Vercel 架构设计

日期：2026-08-22  
状态：待实施计划审核  
范围：保持现有页面内容、URL、视觉结构、广告位和 SEO 行为不变，重构内容型网站的内容层和构建层。

## 1. 背景与目标

当前项目已经使用 Next.js App Router，拥有首页、四种语言、攻略详情页、隐私政策、服务条款、robots.txt 和 sitemap.xml。攻略内容主要保存在 `src/data/inner-pages.ts` 的类型化注册表中，首页和 UI 文案保存在 `src/data/home.ts` 与 `src/data/locales.ts`。

目标架构为：

```text
Next.js App Router 开发模型
        + Vinext/Vite 构建
        + MDX 攻略内容
        + Nitro 产物
        + Vercel 部署
```

本次重构的优先级是内容与 URL 兼容，而不是改变页面设计。目标包括：

1. 将攻略正文和文章元数据迁移到可维护的 MDX 内容文件。
2. 保留现有路由、语言、页面布局、广告脚本、canonical、Open Graph、robots 和 sitemap 行为。
3. 使用 Vite/Vinext 开发和构建，并生成适合 Vercel 的 Nitro 产物。
4. 通过内容等价性测试证明迁移前后的展示内容和 SEO URL 集合一致。

## 2. 非目标与约束

本次不做以下事项：

- 不重写页面 UI、颜色、字体层级或组件视觉风格。
- 不改变已有的英文、德文、法文和巴西葡萄牙文 URL。
- 不将 `内页素材/*.md` 研究笔记直接作为公开页面正文。它们与当前页面实际展示内容不是完全相同的来源，继续保留为研究资料。
- 不添加 OpenAI Sites、Cloudflare Pages、Workers 或 Wrangler 配置。部署目标已经确定为 Vercel。
- 不在本轮把首页、隐私政策和服务条款强行转换为 MDX；它们属于页面级结构化内容，先保持现状以降低风险。
- 不在没有兼容性验证的情况下移除 `next`、`next/image` 或 `next/font` 相关能力。

Vinext 官方文档说明其在 Vite 上重实现公开的 Next.js API，但仍处于快速开发阶段，部分 API 只提供部分支持。因此，本设计将兼容性验证作为实施前置条件，而不是假定所有 Next.js 行为完全等价。

参考：[Vinext README](https://github.com/cloudflare/vinext#readme)。

## 3. 现状基线

当前公开 URL 集合为：

- `/`
- `/de`、`/fr`、`/pt-br`
- `/guides/[slug]`
- `/{locale}/guides/[slug]`
- `/privacy-policy`
- `/terms-of-service`
- `/robots.txt`
- `/sitemap.xml`

攻略数据基线为 21 个 slug、4 种语言，共 84 个攻略页面。当前 sitemap 共 90 个 URL：首页 1 个、语言首页 3 个、攻略页面 84 个、法律页面 2 个。

现有数据类型 `InnerPageRecord` 包含：

- `slug`
- `keyword`
- `title`
- `description`
- `eyebrow`
- `status`
- `checked`
- `quickAnswer`
- `sections`
- `sources`
- `updateWatch`
- `related`

现有的 `src/components/inner-page.tsx` 已经以该结构渲染页面，因此新的内容层应继续输出同一结构，避免组件层出现不必要的连锁修改。

## 4. 目标目录结构

目标结构如下，具体文件扩展名和依赖版本在实施阶段以实际 Vinext/Vite 兼容性为准：

```text
content/
  guides/
    en/
      <slug>.mdx
    de/
      <slug>.mdx
    fr/
      <slug>.mdx
    pt-br/
      <slug>.mdx

src/
  app/
    guides/[slug]/page.tsx
    [locale]/guides/[slug]/page.tsx
  content/
    guide-index.ts
  lib/
    content/
      guides.ts
      schema.ts
      parity.ts
  data/
    home.ts
    locales.ts
  components/
    inner-page.tsx

vite.config.ts
```

内容文件统一放在仓库内的 `content/guides`，内容层代码放在 `src/lib/content`。如果 MDX 编译插件要求内容位于 `src` 下，可在实施阶段采用 `src/content/guides`，但对外数据模型和路由行为不变。

## 5. MDX 内容模型

每个 MDX 文件由 frontmatter 和正文两部分组成。

### 5.1 Frontmatter

建议字段：

```yaml
slug: mortal-shell-ii-guide
locale: en
keyword: Mortal Shell II guide
title: Mortal Shell II guide
description: ...
eyebrow: Field guide
status: Verified
checked: 2026-08-19
quickAnswer: ...
updateWatch: ...
related:
  - mortal-shell-ii-new-shells
  - mortal-shell-ii-release-date
sources:
  - label: Official source
    href: https://...
```

字段使用 TypeScript schema 校验。`status` 只能取现有的 `Verified`、`Beta evidence` 或 `Update watch`。`locale` 必须属于现有四种语言。`related` 中的 slug 必须能解析到已知攻略，避免生成失效的内部链接。

### 5.2 正文

正文使用现有 `sections` 的语义结构：每个二级标题对应一个 section，标题下先是 section intro，再是 bullet list。页面模板继续负责公共的 hero、状态信息、快速答案、来源、更新时间和相关内容区域。

这使得 MDX 负责可读、可编辑的文章正文，而模板继续负责稳定的页面结构。对现有数据而言，迁移脚本或一次性转换逻辑必须从 `innerPageTranslations` 与 `innerPages` 生成 MDX，而不是从研究笔记猜测或重写文案。

## 6. 内容加载与路由数据流

内容加载层负责以下工作：

1. 通过 Vite 兼容的静态内容发现机制建立 MDX 文件索引。
2. 解析 frontmatter 和 MDX 正文。
3. 将正文 section 归一化为现有 `InnerPageSection[]`。
4. 输出兼容现有组件的 `InnerPageRecord`。
5. 提供 `getInnerPage(slug, locale)`、`getAllInnerPageParams()` 等查询函数。
6. 在 slug、locale、必填元数据和关联链接不合法时，在构建或测试阶段失败。

路由只负责：

- 从 params 取得 locale 和 slug；
- 调用内容层查询；
- 对未知内容返回现有的 not-found 行为；
- 使用内容 metadata 生成页面 metadata；
- 继续由 sitemap 生成逻辑枚举所有 locale/slug。

`src/components/inner-page.tsx` 继续接收标准化的 `InnerPageRecord`，不直接读取 MDX 文件。

## 7. Vinext/Vite/Nitro 构建设计

新增 Vite 配置接入 Vinext 与 Nitro。目标配置形态为：

```ts
import { defineConfig } from "vite";
import vinext from "vinext";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [vinext(), nitro()],
});
```

实施时需要验证：

- 当前 `src/app` App Router 路由是否被正确识别；
- `generateStaticParams` 是否生成完整页面；
- `generateMetadata`、`metadataBase`、canonical 和 Open Graph 是否保持正确；
- `next/image` 当前用法是否能生成正确资源；
- `next/font/google` 在构建和 Vercel 运行时是否满足现有视觉与可访问性要求；
- MDX 编译、动态路由和静态输出是否能同时工作；
- Nitro 是否生成可被 Vercel 识别的 `.output` 目录。

Vercel 项目配置目标为：

- Framework/build：使用 Vite/Vinext 项目配置；
- Build command：`vite build`；
- Output directory：`.output`（由 Nitro 生成）；
- `NEXT_PUBLIC_SITE_URL`：继续设置为 `https://www.ms2guide.site`；
- 不增加 Cloudflare 专用环境变量或配置。

具体 npm scripts 会在依赖安装并完成本地验证后确定，避免把仅适用于某一 Vinext 版本的启动命令写死。

## 8. SEO 与广告兼容性

SEO 目标是保持现有输出，并确保迁移后仍然使用 HTTPS canonical 主域名：

- `metadataBase` 继续指向 `https://www.ms2guide.site`；
- 根页面和攻略页面 canonical 继续规范到当前主 URL；
- Open Graph 的 `url`、标题、描述和图片继续由页面 metadata 生成；
- sitemap 继续输出 90 个 HTTPS URL，不出现 HTTP 或非 www 主机名；
- robots 继续声明 `https://www.ms2guide.site/sitemap.xml`；
- 多语言页面继续保留当前 locale 路由和 alternates 行为；
- 现有两个广告位及其外部脚本继续保留，不能被 MDX 迁移删除或重复注入。

SEO 测试将以最终生成的 metadata 和 XML 文本为准，而不是只检查源代码中是否存在某个字符串。

## 9. 迁移顺序

实施阶段按以下顺序进行：

1. 锁定当前基线：运行现有测试和 Next 构建，记录路由、sitemap 数量及关键 metadata。
2. 安装并验证 Vinext、Nitro 和 MDX 所需依赖，先验证最小页面和最小 MDX 文件。
3. 建立 schema、loader 和 content index，不改动页面内容。
4. 从当前 TypeScript 数据生成 84 个 MDX 文件，并保留旧数据作为迁移期基线。
5. 接入英文和多语言攻略路由。
6. 加入旧数据与新 MDX 数据的逐字段等价性测试。
7. 验证图片、字体、广告、metadata、robots 和 sitemap。
8. 使用 Vercel Preview 部署并检查真实构建产物。
9. 通过验收后切换 Vercel Production 构建命令。
10. 确认正式域名响应、sitemap 可抓取后，再移除仅用于基线比对的旧正文注册表。

如果 Vinext 构建暂时无法承载某项能力，迁移停留在兼容适配阶段，不先删除可工作的旧实现。

## 10. 测试与验收标准

### 内容等价性

对 21 个 slug 和 4 个 locale 全量比较：

- slug、标题、描述、keyword、eyebrow；
- status、checked、quickAnswer、updateWatch；
- 所有 section 标题、intro 和 bullet 顺序；
- sources 的 label 与 href；
- related slug 顺序；
- locale 页面是否回退或覆盖到正确字段。

### 构建与路由

- 现有 Vitest 测试全部通过；
- MDX schema 和 loader 测试通过；
- Vinext/Vite/Nitro 生产构建成功；
- 首页、英文攻略、多语言攻略、隐私政策和服务条款可访问；
- 不存在意外的 404、重复 slug 或遗漏 locale。

### SEO 与部署

- sitemap 为有效 XML，包含 90 个 HTTPS URL；
- robots 的 sitemap 指向 HTTPS www 主域名；
- 页面 canonical 不回退到 HTTP 或非 www；
- Open Graph URL 与 canonical 一致；
- Vercel Preview 产物正常运行，Production 切换后正式域名正常响应。

### 视觉与功能

- 页面主要结构、导航、相关链接和广告容器仍存在；
- 文章正文文字和列表顺序与迁移前一致；
- 图片、字体和响应式布局无明显回归。

## 11. 风险与回滚

主要风险是 Vinext 的 API 兼容性、MDX 插件组合、字体运行时下载和图片处理行为与当前 Next.js 不完全一致。风险控制方式为：

- 先建立旧实现基线，再逐能力迁移；
- 依赖版本固定，避免使用未验证的 latest 组合；
- 每次迁移只改变一个边界；
- Preview 验证通过前不切换 Production；
- 保留可恢复的旧内容索引，直到等价测试和正式部署验证完成。

回滚时恢复 Vercel 的原构建命令和旧依赖/配置即可；URL、域名和内容文件不需要改变。

## 12. 完成定义

只有同时满足以下条件，才认为本次架构重构完成：

1. 84 个攻略页面已由 MDX 内容层提供。
2. 旧数据与新数据的等价性测试通过。
3. Vinext/Vite/Nitro 本地生产构建通过。
4. Vercel Preview 和 Production 均能正常提供页面。
5. 现有页面内容、URL、广告、canonical、Open Graph、robots 和 sitemap 均保持要求的行为。
6. GSC 需要提交的 sitemap 地址仍为可直接访问的 HTTPS 地址：`https://www.ms2guide.site/sitemap.xml`。
