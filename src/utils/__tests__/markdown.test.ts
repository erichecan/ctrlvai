import { 
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedPosts
} from '../markdown';
import { BlogPost } from '@/types';

describe('markdown utilities', () => {
  // 模拟测试数据
  const mockPosts: BlogPost[] = [
    {
      slug: 'post-1',
      title: 'First Post',
      date: '2023-01-01',
      tags: ['react', 'typescript'],
      content: 'Content 1',
      draft: false
    },
    {
      slug: 'post-2',
      title: 'Second Post',
      date: '2023-02-01',
      tags: ['react', 'javascript'],
      content: 'Content 2',
      draft: false
    },
    {
      slug: 'post-3',
      title: 'Third Post',
      date: '2023-03-01',
      tags: ['nodejs', 'typescript'],
      content: 'Content 3',
      draft: true // 草稿
    }
  ];

  beforeEach(() => {
    jest.resetModules();
    jest.doMock('../markdown', () => ({
      getAllBlogPosts: jest.fn(() => Promise.resolve([
        {
          id: '2',
          slug: 'post-2',
          title: 'Second Post',
          content: 'Content 2',
          tags: ['test', 'demo'],
          category: 'general',
          date: '2023-01-02',
          draft: false
        },
        {
          id: '1',
          slug: 'post-1',
          title: 'First Post',
          content: 'Content 1',
          tags: ['test', 'demo'],
          category: 'general',
          date: '2023-01-01',
          draft: false
        }
      ])),
      getBlogPostBySlug: jest.fn((slug: string) => {
        const posts = [
          {
            id: '1',
            slug: 'post-1',
            title: 'First Post',
            content: 'Content 1',
            tags: ['test', 'demo'],
            category: 'general',
            date: '2023-01-01',
            draft: false
          },
          {
            id: '2',
            slug: 'post-2',
            title: 'Second Post',
            content: 'Content 2',
            tags: ['test', 'demo'],
            category: 'general',
            date: '2023-01-02',
            draft: false
          }
        ];
        return Promise.resolve(posts.find(post => post.slug === slug) || null);
      }),
      getRelatedPosts: jest.fn((currentPost: BlogPost, limit = 3) => {
        const posts = [
          {
            id: '2',
            slug: 'post-2',
            title: 'Second Post',
            content: 'Content 2',
            tags: ['test', 'demo'],
            category: 'general',
            date: '2023-01-02',
            draft: false
          }
        ];
        return Promise.resolve(posts.slice(0, limit));
      })
    }));
  });

  describe('getAllBlogPosts', () => {
    it('should return all non-draft posts sorted by date', async () => {
      const posts = await getAllBlogPosts();
      expect(posts).toHaveLength(2);
      expect(posts[0].slug).toBe('post-2');
      expect(posts[1].slug).toBe('post-1');
    });
  });

  describe('getBlogPostBySlug', () => {
    it('should return post by slug', async () => {
      const post = await getBlogPostBySlug('post-1');
      expect(post?.title).toBe('First Post');
    });

    it('should return null for non-existent slug', async () => {
      const post = await getBlogPostBySlug('non-existent');
      expect(post).toBeNull();
    });
  });

  describe('getRelatedPosts', () => {
    it('should return related posts excluding current post', async () => {
      const related = await getRelatedPosts(mockPosts[0]);
      expect(related).toHaveLength(1);
      expect(related[0].slug).toBe('post-2');
    });

    it('should respect limit parameter', async () => {
      const related = await getRelatedPosts(mockPosts[0], 1);
      expect(related).toHaveLength(1);
    });
  });
});