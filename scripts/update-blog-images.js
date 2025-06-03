const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const axios = require('axios');
const cheerio = require('cheerio');

// 博客文章目录
const BLOG_DIR = path.join(__dirname, '../blogs');

// 搜索图片的函数（使用 Pexels API，抓取高清大图）
async function searchImage(query) {
  const PEXELS_API_KEY = "8UHM3E2dD6SdVlEdPAoXSvH1TpyBOJcClZsybQZLsdj1mB4T7XK78xfb";
  const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`;
  try {
    const response = await axios.get(searchUrl, { headers: { "Authorization": PEXELS_API_KEY } });
    if (response.data && response.data.photos && response.data.photos.length > 0) {
      const imgUrl = response.data.photos[0].src.original; // 高清大图直链
      return imgUrl;
    } else {
      console.log("No image found for query: " + query);
      return null;
    }
  } catch (error) {
    console.error("Error searching image for \"" + query + "\":", error.message);
    return null;
  }
}

// 更新博客文章的函数
async function updateBlogPost(filePath) {
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdown } = matter(content);
    
    // 构建搜索查询
    const searchQuery = `${frontmatter.title} ${frontmatter.category || ''} ${(frontmatter.tags || []).join(' ')} AI technology`;
    
    // 搜索图片
    const imageUrl = await searchImage(searchQuery);
    if (!imageUrl) {
      console.log(`No image found for ${filePath}`);
      return;
    }
    
    // 强制覆盖 frontmatter.image
    frontmatter.image = imageUrl;
    
    // 写回文件
    const newContent = matter.stringify(markdown, frontmatter);
    fs.writeFileSync(filePath, newContent);
    
    console.log(`Updated ${filePath} with image: ${imageUrl}`);
    
    // 添加延迟以避免请求过快
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// 主函数
async function main() {
  try {
    // 读取所有 md 文件
    const files = fs.readdirSync(BLOG_DIR)
      .filter(file => file.endsWith('.md'));
    
    console.log(`Found ${files.length} blog posts to process`);
    
    // 处理每个文件
    for (const file of files) {
      const filePath = path.join(BLOG_DIR, file);
      await updateBlogPost(filePath);
    }
    
    console.log('Finished processing all blog posts');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// 运行脚本
main(); 