import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders correctly', () => {
    render(<Header />);
    
    // Check logo is present
    expect(screen.getByText('CtrlV AI')).toBeInTheDocument();
    
    // Check desktop navigation items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Learning Center')).toBeInTheDocument();
    expect(screen.getByText('AI Tools')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // Check mobile menu button
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('highlights active menu item', () => {
    (usePathname as jest.Mock).mockReturnValue('/blog');
    render(<Header />);
    
    const blogMenuItem = screen.getByText('Blog').closest('li');
    expect(blogMenuItem).toHaveClass('ant-menu-item-selected');
  });

  it('matches snapshot', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});