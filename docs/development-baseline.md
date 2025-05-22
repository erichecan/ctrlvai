# 全站开发基准规范

## 1. 分层架构
```
┌────────────────┐    ┌────────────────┐    ┌────────────────┐
│   Presentation │ ←→ │  Application   │ ←→ │   Infrastructure│
└────────────────┘    └────────────────┘    └────────────────┘
        UI组件层             业务逻辑层             数据访问层
```

## 2. 代码架构规范

### 2.1 目录结构
```
src/
├─ app/                    # 页面路由
│  ├─ (main)/
│  │  ├─ layout.tsx        # 主布局
│  │  ├─ page.tsx          # 首页
│  │  ├─ blog/             # 博客模块
│  │  ├─ tools/            # 工具模块
│  │  └─ learning/         # 学习模块
│  └─ (admin)/             # 管理后台路由
│
├─ components/             # 通用组件库
│  ├─ ui/                  # 基础UI组件
│  │  ├─ cards/
│  │  ├─ navigation/
│  │  └─ ...
│  └─ modules/             # 业务模块组件
│     ├─ blog/
│     ├─ tools/
│     └─ learning/
│
├─ lib/
│  ├─ application/         # 业务逻辑
│  │  ├─ blog/
│  │  ├─ tools/
│  │  └─ learning/
│  └─ infrastructure/      # 基础设施
│     ├─ cms/
│     ├─ api/
│     └─ services/
│
└─ types/                  # 全局类型定义
```

## 3. 组件架构规范

### 3.1 组件分类标准
| 类型       | 定位               | 示例                  | 开发要求               |
|------------|--------------------|-----------------------|-----------------------|
| 基础组件    | 无业务逻辑         | Button, Card          | 100%类型覆盖           |
| 模块组件    | 封装业务逻辑       | BlogCard, ToolDetail  | 严格Props验证          |
| 模板组件    | 页面骨架           | MainLayout            | 零业务逻辑             |

### 3.2 组件开发规范
```tsx
// 标准组件模板
import type { FC } from 'react'

interface CardProps {
  title: string
  description: string
  imageUrl?: string
  badge?: ReactNode
}

export const Card: FC<CardProps> = ({
  title,
  description,
  imageUrl,
  badge,
}) => {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      {imageUrl && (
        <div className="relative h-40">
          <Image src={imageUrl} fill alt={title} />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{title}</h3>
          {badge}
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </article>
  )
}
```

## 4. API架构规范

### 4.1 接口分层
```
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  Client API   │ ← │ Service Layer │ ← │  CMS Driver   │
└───────────────┘   └───────────────┘   └───────────────┘
    (前端调用层)         (业务服务层)        (数据驱动层)
```

### 4.2 接口契约示例
```typescript
// types/api.ts
interface PaginationParams {
  page: number
  pageSize: number
}

interface BlogPostDTO {
  id: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

// lib/infrastructure/api/blog.ts
class BlogApiClient {
  async getPosts(params: PaginationParams): Promise<BlogPostDTO[]> {
    const res = await fetch(`/api/blog?${qs.stringify(params)}`)
    return handleApiResponse(res)
  }
  
  async getPost(id: string): Promise<BlogPostDTO> {
    const res = await fetch(`/api/blog/${id}`)
    return handleApiResponse(res)
  }
}

// 统一响应处理
function handleApiResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }
  return response.json()
}
```

## 5. 质量保障

### 5.1 测试规范
| 测试类型   | 覆盖范围           | 工具链              | 通过标准         |
|------------|--------------------|---------------------|------------------|
| 单元测试    | 业务逻辑/工具函数  | Jest + Testing Lib  | >80%覆盖率       |
| 组件测试    | UI交互             | Storybook + Jest    | 核心用例100%覆盖 |
| E2E测试    | 关键用户旅程       | Cypress             | 核心流程100%通过 |

### 5.2 代码审查清单
1. [ ] 类型定义完整
2. [ ] 组件职责单一
3. [ ] API错误处理完备
4. [ ] 无跨层直接调用
5. [ ] 测试用例覆盖

## 6. 开发流程

### 6.1 功能开发流程
```mermaid
graph LR
    A[需求分析] --> B[接口设计]
    B --> C[组件开发]
    C --> D[逻辑实现]
    D --> E[测试验证]
    E --> F[代码审查]
```

### 6.2 分支命名规范
```
feat/<模块>-<功能>   # 新功能开发
fix/<模块>-<问题>    # Bug修复
refactor/<模块>      # 代码重构
```