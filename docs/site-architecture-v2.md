# 全站技术架构设计

## 1. 整体架构
```
全局布局
├─ 顶部导航 (固定)
├─ 内容区
│  ├─ 首页 (内容聚合)
│  │  ├─ 最新博客模块 → /blog/[id]
│  │  ├─ 学习中心模块 → /learning/[id] 
│  │  └─ 工具中心模块 → /tools/[id]
│  ├─ 博客系统
│  │  ├─ 列表页 (/blog) 
│  │  └─ 详情页 (/blog/[id])
│  ├─ 学习中心
│  │  ├─ 列表页 (/learning)
│  │  └─ 详情页 (/learning/[id])
│  └─ 工具中心
│     ├─ 列表页 (/tools)
│     └─ 详情页 (/tools/[id])
└─ 页脚导航 (固定)
```

## 2. 文件目录结构
```
app/
├─ layout.tsx            # 全局布局
├─ page.tsx              # 首页
├─ blog/
│  ├─ page.tsx           # 博客列表
│  └─ [id]/page.tsx      # 博客详情
├─ learning/
│  ├─ page.tsx           # 学习列表
│  └─ [id]/page.tsx      # 学习详情  
├─ tools/
│  ├─ page.tsx           # 工具列表
│  └─ [id]/page.tsx      # 工具详情
└─ (other)/              # 其他常规页面

components/
├─ navigation/
│  ├─ Header.tsx         # 顶部导航
│  └─ Footer.tsx         # 页脚导航
├─ cards/
│  ├─ BlogCard.tsx       # 博客卡片
│  ├─ ToolCard.tsx       # 工具卡片
│  └─ LearningCard.tsx   # 学习卡片
└─ content/
   ├─ BlogContent.tsx    # 博客详情内容
   ├─ ToolContent.tsx    # 工具详情内容
   └─ VideoPlayer.tsx    # 学习视频播放器

lib/
├─ cms/
│  ├─ blog.ts            # 博客内容操作
│  ├─ tools.ts           # 工具内容操作
│  └─ learning.ts        # 学习内容操作
└─ api/
   ├─ blog.ts            # 博客API封装
   ├─ tools.ts           # 工具API封装
   └─ learning.ts        # 学习API封装
```

## 3. 核心功能规范

### 3.1 内容卡片设计
```tsx
// 统一卡片属性
interface ContentCardProps {
  id: string          // 三位数格式ID
  title: string       // 标题（不超过28字符）
  description: string // 描述（不超过96字符）
  image?: string      // 封面图URL
  category: string    // 分类标签
  date: string        // ISO格式日期
  url: string         // 详情页路径
}
```

### 3.2 详情页规范
| 模块    | 核心功能                          | 特殊要求                  |
|---------|---------------------------------|-------------------------|
| 博客     | Markdown内容渲染                 | 代码高亮/暗黑模式支持       |
| 工具中心 | 工具使用指南                      | 参数配置面板/快速复制按钮   |
| 学习中心 | 视频播放+时间戳                  | 播放统计/课程资料下载      |

### 3.3 CMS接口要求
```typescript
// 统一内容管理接口
interface CMSContent {
  create(content: ContentDto): Promise<Content>
  update(id: string, content: ContentDto): Promise<Content>
  getList(params: PaginationParams): Promise<PaginatedList<Content>>
  getDetail(id: string): Promise<ContentDetail>
}
```

## 4. 技术选型

### 4.1 核心框架
- Next.js 14 (App Router)
- React 18
- TypeScript 5

### 4.2 样式方案
- Tailwind CSS 3
- Headless UI (交互组件)
- Lucide React (图标库)

### 4.3 特色功能实现
| 功能           | 技术方案                     |
|----------------|----------------------------|
| 视频播放        | YouTube Player API + 自定义控件 |
| 代码高亮        | Shiki + 主题系统             |
| 内容搜索        | Algolia 即时搜索             |
| 暗黑模式        | Next-Themes 无缝切换         |

## 5. 开发规范

### 5.1 分支策略
```
feature/模块-功能名   # 新功能开发
fix/模块-问题描述    # Bug修复
docs/更新内容       # 文档更新
```

### 5.2 提交规范
```
feat: 添加博客分页功能
fix: 修复视频播放器闪退问题
docs: 更新架构设计文档
style: 调整卡片间距
```

### 5.3 代码检查
```json
// .eslintrc 部分配置
{
  "rules": {
    "react/display-name": "off",
    "import/no-anonymous-default-export": "error",
    "jsx-a11y/alt-text": "warn"
  }
}
```