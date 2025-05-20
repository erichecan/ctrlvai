# ctrlvAI 网站操作指南

本指南将帮助您管理和更新 ctrlvAI 网站的内容，包括发布新的博客文章、更新导航站内容以及调整 SEO 设置。

## 目录

1. [博客文章发布指南](#1-博客文章发布指南)
2. [导航内容更新指南](#2-导航内容更新指南)
3. [SEO 设置调整指南](#3-seo-设置调整指南)
4. [部署与维护指南](#4-部署与维护指南)

---

## 1. 博客文章发布指南

### 1.1 创建新博客文章

ctrlvAI 网站支持使用 Markdown 格式编写和发布博客文章。以下是发布新文章的步骤：

#### 步骤 1: 准备 Markdown 文件

创建一个新的 Markdown (.md) 文件，包含以下前置元数据：

```markdown
---
title: "文章标题"
date: "YYYY-MM-DD"
category: "分类名称"
tags: ["标签1", "标签2", "标签3"]
excerpt: "文章摘要，将显示在列表页面"
coverImage: "/images/blog/your-image.jpg"
---

这里是文章正文内容，支持完整的 Markdown 语法...
```

#### 步骤 2: 添加文章内容

在元数据区域后，使用 Markdown 语法编写文章内容：

- 使用 `#`、`##`、`###` 等创建标题层级
- 使用 `*斜体*` 和 `**粗体**` 强调文本
- 使用 `[链接文本](URL)` 创建链接
- 使用 `![替代文本](图片URL)` 插入图片
- 使用 `` `代码` `` 插入行内代码
- 使用 ``` 创建代码块

#### 步骤 3: 添加图片

1. 将文章相关图片上传到 `/public/images/blog/` 目录
2. 在文章中使用相对路径引用图片：`![图片描述](/images/blog/your-image.jpg)`

#### 步骤 4: 嵌入视频

要在博客文章中嵌入 YouTube 视频，可以使用以下格式：

```markdown
<div className="video-container">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="视频标题"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
```

将 `VIDEO_ID` 替换为 YouTube 视频的 ID。

#### 步骤 5: 保存文件

将 Markdown 文件保存到 `/src/content/blog/` 目录，文件名应使用 URL 友好的格式：

```
your-article-title.md
```

### 1.2 更新现有文章

1. 导航到 `/src/content/blog/` 目录
2. 找到要更新的文章文件
3. 编辑内容并保存
4. 重新部署网站以应用更改

### 1.3 管理分类和标签

#### 添加新分类

1. 打开 `/src/data/categories.ts` 文件
2. 添加新分类：

```typescript
{
  id: "category-slug",
  name: "分类名称",
  description: "分类描述"
}
```

#### 添加新标签

标签可以直接在文章的前置元数据中定义，无需预先创建。

---

## 2. 导航内容更新指南

### 2.1 添加新工具

#### 步骤 1: 准备工具图标

1. 获取工具的 SVG 或 PNG 图标
2. 将图标保存到 `/public/images/tools/` 目录

#### 步骤 2: 添加工具数据

1. 打开 `/src/data/tools.ts` 文件
2. 在相应的分类下添加新工具：

```typescript
{
  id: "tool-id",
  name: "工具名称",
  description: "工具描述",
  icon: "/images/tools/tool-icon.svg",
  category: "category-id",
  isFree: true, // 或 false
  link: "https://tool-website.com",
  features: ["特性1", "特性2", "特性3"],
  pros: ["优点1", "优点2"],
  cons: ["缺点1", "缺点2"]
}
```

### 2.2 更新工具信息

1. 打开 `/src/data/tools.ts` 文件
2. 找到要更新的工具数据
3. 修改相应字段
4. 保存文件并重新部署

### 2.3 添加新的场景导航

1. 打开 `/src/data/scenarios.ts` 文件
2. 添加新的场景：

```typescript
{
  id: "scenario-id",
  title: "场景标题",
  description: "场景描述",
  icon: "场景图标（emoji）",
  tools: ["tool-id-1", "tool-id-2", "tool-id-3"]
}
```

---

## 3. SEO 设置调整指南

### 3.1 更新全局 SEO 设置

1. 打开 `/src/app/layout.tsx` 文件
2. 修改 `metadata` 对象中的内容：

```typescript
export const metadata: Metadata = {
  title: "网站标题",
  description: "网站描述",
  // 其他元数据
};
```

### 3.2 更新页面级 SEO 设置

每个页面都可以有自己的 SEO 设置。例如，要更新博客页面的 SEO：

1. 打开 `/src/app/blog/page.tsx` 文件
2. 添加或修改 `generateMetadata` 函数：

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "博客页面标题",
    description: "博客页面描述",
    // 其他元数据
  };
}
```

### 3.3 添加结构化数据

结构化数据帮助搜索引擎更好地理解页面内容：

1. 打开相应页面文件
2. 添加或修改 `jsonLd` 对象：

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "页面名称",
  "description": "页面描述",
  // 其他结构化数据
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 页面内容 */}
    </>
  );
}
```

### 3.4 管理关键词

1. 为全站关键词：修改 `/src/app/layout.tsx` 中的 `keywords` 元标签
2. 为特定页面关键词：在页面的 `generateMetadata` 函数中添加 `keywords` 字段

---

## 4. 部署与维护指南

### 4.1 部署到 Netlify

ctrlvAI 网站设计为可直接部署到 Netlify：

1. 登录 Netlify 账户
2. 点击 "New site from Git"
3. 选择您的 Git 仓库
4. 构建设置：
   - 构建命令：`npm run build`
   - 发布目录：`.next`
5. 点击 "Deploy site"

### 4.2 环境变量设置

在 Netlify 中设置以下环境变量：

- `NEXT_PUBLIC_SITE_URL`: 您的网站 URL
- `NEXT_PUBLIC_DISQUS_SHORTNAME`: Disqus 短名称
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics 测量 ID

### 4.3 自定义域名设置

1. 在 Netlify 中，进入您的站点设置
2. 点击 "Domain settings"
3. 点击 "Add custom domain"
4. 按照指示设置 DNS 记录

### 4.4 更新与维护

1. 定期更新依赖：
   ```bash
   npm update
   ```

2. 检查性能和 SEO：
   - 使用 Google PageSpeed Insights 检查性能
   - 使用 Google Search Console 监控 SEO 表现

3. 备份内容：
   - 定期备份 `/src/content/` 目录中的内容
   - 备份 `/public/images/` 目录中的图片

---

## 5. 故障排除

### 5.1 常见问题

#### 图片不显示

- 检查图片路径是否正确
- 确认图片已上传到正确目录
- 验证图片格式是否支持（推荐使用 .jpg, .png, .webp）

#### 部署失败

- 检查构建日志中的错误信息
- 验证所有依赖是否正确安装
- 确认环境变量设置正确

#### 内容更新未生效

- 确认文件已保存
- 检查 Markdown 语法是否正确
- 重新触发部署

### 5.2 获取支持

如需进一步支持，请联系网站管理员或开发团队。
