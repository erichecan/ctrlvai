'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Table, Button, Space, Tag, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AdminLayout from '@/components/admin/AdminLayout';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  author?: string;
  slug?: string;
  image?: string;
  draft?: boolean;
  content: string;
}

const BlogAdminPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      } else {
        message.error('Failed to fetch blog posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      message.error('An error occurred while fetching blog posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use the existing categories from posts
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success) {
        const uniqueCategories = Array.from(new Set(data.posts.map((post: BlogPost) => post.category)));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTags = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use the existing tags from posts
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success) {
        const allTags = data.posts.flatMap((post: BlogPost) => post.tags);
        const uniqueTags = Array.from(new Set(allTags));
        setTags(uniqueTags);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    form.setFieldsValue({
      ...post,
      tags: post.tags,
    });
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this post?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          // In a real app, this would be an API call
          // For now, we'll just update the local state
          setPosts(posts.filter(post => post.id !== id));
          message.success('Post deleted successfully');
        } catch (error) {
          console.error('Error deleting post:', error);
          message.error('Failed to delete post');
        }
      },
    });
  };

  const handleCreate = () => {
    setEditingPost(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingPost) {
        // Update existing post
        const updatedPost = { ...editingPost, ...values };
        // In a real app, this would be an API call
        setPosts(posts.map(post => post.id === editingPost.id ? updatedPost : post));
        message.success('Post updated successfully');
      } else {
        // Create new post
        const newPost = {
          ...values,
          id: Math.max(0, ...posts.map(p => p.id)) + 1,
          date: new Date().toISOString().split('T')[0],
          draft: false,
        };
        // In a real app, this would be an API call
        setPosts([newPost, ...posts]);
        message.success('Post created successfully');
      }
      
      setModalVisible(false);
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: BlogPost, b: BlogPost) => a.id - b.id,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: BlogPost) => (
        <a href={`/blog/${record.slug || record.id}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: BlogPost, b: BlogPost) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="purple">{category}</Tag>,
      filters: categories.map(cat => ({ text: cat, value: cat })),
      onFilter: (value: string, record: BlogPost) => record.category === value,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.slice(0, 2).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {tags.length > 2 && <Tag>+{tags.length - 2}</Tag>}
        </>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: BlogPost) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout selectedKey="blog">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Blog Posts Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleCreate}
          className="bg-[#1976D2]"
        >
          Add New Post
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={posts} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        okText={editingPost ? 'Update' : 'Create'}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ author: 'AI Analysis Team' }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the post title' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="slug"
            label="Slug (URL-friendly title)"
            rules={[{ required: false }]}
          >
            <Input placeholder="e.g., my-blog-post-title" />
          </Form.Item>
          
          <Form.Item
            name="excerpt"
            label="Excerpt"
            rules={[{ required: true, message: 'Please enter a short excerpt' }]}
          >
            <TextArea rows={2} maxLength={160} showCount />
          </Form.Item>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select
                placeholder="Select a category"
                allowClear
                showSearch
              >
                {categories.map(category => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
                <Option key="new-category" value="new-category">+ Add New Category</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="author"
              label="Author"
            >
              <Input />
            </Form.Item>
          </div>
          
          <Form.Item
            name="tags"
            label="Tags"
            rules={[{ required: true, message: 'Please add at least one tag' }]}
          >
            <Select
              mode="tags"
              placeholder="Add tags"
              style={{ width: '100%' }}
            >
              {tags.map(tag => (
                <Option key={tag} value={tag}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="image"
            label="Featured Image URL"
          >
            <Input placeholder="e.g., /images/blog/my-image.jpg" />
          </Form.Item>
          
          <Form.Item
            name="content"
            label="Content (Markdown)"
            rules={[{ required: true, message: 'Please enter the post content' }]}
          >
            <TextArea rows={10} />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default BlogAdminPage;
