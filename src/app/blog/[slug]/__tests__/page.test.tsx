import BlogPostPage from '../page';
import { render, screen, waitFor } from '@testing-library/react';
import { notFound } from 'next/navigation';

// 模拟next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// 模拟markdown工具
jest.mock('@/utils/markdown', () => ({
  getBlogPostBySlug: jest.fn(),
  getRelatedPosts: jest.fn(),
}));

describe('BlogPostPage', () => {
  const mockPost = {
    slug: 'test-post',
    title: 'Test Post',
    date: '2023-01-01',
    content: 'Test content',
    tags: ['react', 'testing'],
    draft: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    require('@/utils/markdown').getBlogPostBySlug.mockResolvedValue(mockPost);
    require('@/utils/markdown').getRelatedPosts.mockResolvedValue([]);
  });

  it('renders blog post content', async () => {
    render(<BlogPostPage params={{ slug: 'test-post' }} />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });
  });

  it('shows not found for non-existent post', async () => {
    require('@/utils/markdown').getBlogPostBySlug.mockResolvedValue(null);
    render(<BlogPostPage params={{ slug: 'non-existent' }} />);
    
    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
  });

  it('shows error boundary when fetch fails', async () => {
    require('@/utils/markdown').getBlogPostBySlug.mockRejectedValue(new Error('Fetch failed'));
    render(<BlogPostPage params={{ slug: 'test-post' }} />);
    
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    });
  });
});