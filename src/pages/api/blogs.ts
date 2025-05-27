import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBlogPosts } from '@/server/utils/markdown';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await getAllBlogPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
}
