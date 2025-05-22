# 全站内容架构设计

## 1. 整体架构
```
首页 (/) → 博客系统 (/blog) → 学习中心 (/learning) → 工具中心 (/tools)
```

## 2. 核心模块

### 2.1 首页模块
- **功能**：
  - 展示最新博客
  - 学习中心入口
  - 工具中心入口

- **数据流**：
  ```mermaid
  graph LR
    A[首页] --> B[博客API]
    A --> C[学习中心API]
    A --> D[工具中心API]
  ```

### 2.2 博客系统
- **页面结构**：
  ```
  列表页 (/blog) → 详情页 (/blog/[id])
  ```
- **数据流**：
  - 统一使用3位数ID格式
  - 客户端组件处理交互

### 2.3 学习中心
- **功能**：
  - 分类学习资源
  - 进度跟踪
  - 资源推荐

### 2.4 工具中心
- **功能**：
  - 工具分类展示
  - 快捷入口
  - 使用统计

## 3. 数据架构

### 3.1 数据获取规范
- 前端：
  ```typescript
  // 标准API调用示例
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/[endpoint]`)
  ```
  
- 后端：
  ```typescript
  // 标准API路由示例
  export async function GET() {
    return NextResponse.json(await getData())
  }
  ```

### 3.2 数据类型
```typescript
// 通用数据接口
interface ContentItem {
  id: string       // 三位数格式ID
  title: string
  description?: string
  category: string
  createdAt: string
  updatedAt: string
}
```

## 4. 组件架构

### 4.1 通用组件
- `ContentCard`: 内容卡片
- `CategoryNav`: 分类导航
- `Pagination`: 分页器

### 4.2 专用组件
- `BlogSection`: 博客专区
- `LearningCard`: 学习卡片
- `ToolItem`: 工具项

## 5. 部署架构

### 5.1 环境变量
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 5.2 构建规范
- 页面类型：
  - 首页：SSG (静态生成)
  - 博客：ISR (增量静态再生)
  - 工具中心：CSR (客户端渲染)

## 6. 更新日志
- 2023-11-20: 初始版本
- 2023-11-21: 整合全站架构
- 2023-11-21: 增加部署规范