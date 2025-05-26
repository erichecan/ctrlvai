# CtrlV AI - AI Tools Navigation Website

CtrlV AI is a comprehensive platform for discovering, learning about, and mastering AI tools. The website includes a blog, learning center with video tutorials, and an AI tools directory, all designed with SEO optimization in mind.

## Features

- **Blog**: Articles about AI tools, resources, trends, and usage tips
- **Learning Center**: Video tutorials for mastering AI tools
- **AI Tools Directory**: Curated collection of AI tools organized by category and use case
- **CMS**: Simple admin panel for managing content
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **SEO Friendly**: Built with SEO best practices

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Ant Design
- **Data Management**: File-based for blog posts, JSON for tools and videos
- **Authentication**: Simple password-based authentication for CMS
- **Deployment**: Compatible with Netlify

## Project Structure

```
ctrlvai/
├── blogs/                  # Markdown blog posts
├── public/
│   ├── data/               # JSON data files
│   ├── images/             # Image assets
│   └── icons/              # Icon assets
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── admin/          # CMS admin pages
│   │   ├── api/            # API routes
│   │   ├── blog/           # Blog pages
│   │   ├── learning-center/# Learning center pages
│   │   ├── tools/          # AI tools pages
│   │   ├── about/          # About page
│   │   └── contact/        # Contact page
│   ├── components/         # React components
│   │   ├── admin/          # Admin components
│   │   ├── blog/           # Blog components
│   │   ├── layout/         # Layout components
│   │   ├── learning/       # Learning center components
│   │   ├── tools/          # Tools components
│   │   └── ui/             # UI components
│   ├── lib/                # Library code
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── styles/             # Global styles
└── package.json            # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ctrlvai.git
   cd ctrlvai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create sample blog posts:
   - Add Markdown files to the `blogs/` directory following the format in the documentation

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Blog Post Format

Blog posts are stored as Markdown files in the `blogs/` directory. Each file should include frontmatter with the following fields:

```markdown
---
id: 1
title: "Example Blog Post Title"
date: "2024-05-01"
category: "AI Tools"
tags:
  - "ChatGPT"
  - "Productivity"
excerpt: "A brief summary of the blog post (max 160 characters)"
author: "AI Analysis Team"
slug: "example-blog-post-title"
image: "/images/blog/example-image.jpg"
draft: false
priority: 0.8
---

Your blog post content goes here...
```

## CMS Access

The CMS is accessible at `/admin` with the following default credentials:
- Username: `admin`
- Password: `admin123`

**Important**: Change these credentials in production.

## Deployment

### Deploying to Netlify

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Log in to Netlify and click "New site from Git"
3. Select your repository and configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Click "Deploy site"

## Environment Variables

For production, you should set the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
