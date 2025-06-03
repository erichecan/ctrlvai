'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Table, Button, Space, Tag, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AdminLayout } from '@/components/admin/AdminLayout';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface BlogPost {
  id?: number;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  author?: string;
  slug: string;
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
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success) {
        const uniqueCategories = Array.from(new Set(data.posts.map((post: BlogPost) => post.category)));
        setCategories(uniqueCategories.filter((cat): cat is string => typeof cat === 'string'));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success) {
        const allTags = data.posts.flatMap((post: BlogPost) => post.tags);
        const uniqueTags = Array.from(new Set(allTags));
        setTags(uniqueTags.filter((tag): tag is string => typeof tag === 'string'));
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    console.log('Editing post:', post);
    setEditingPost(post);
    const formValues = {
      ...post,
      tags: post.tags || [],
      category: post.category || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || 'AI Analysis Team',
      image: post.image || '',
    };
    console.log('Setting form values:', formValues);
    form.setFieldsValue(formValues);
    setModalVisible(true);
  };

  const handleDelete = (slug: string) => {
    console.log('Delete button clicked for slug:', slug);
    Modal.confirm({
      title: 'Are you sure you want to delete this post?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        console.log('Delete confirmed, calling API for slug:', slug);
        try {
          const response = await fetch(`/api/blog/${slug}`, {
            method: 'DELETE',
          });
          
          console.log('Delete API response status:', response.status);
          const data = await response.json();
          console.log('Delete API response data:', data);
          
          if (data.success) {
            setPosts(posts.filter(post => post.slug !== slug));
            message.success('Post deleted successfully');
          } else {
            message.error(data.message || 'Failed to delete post');
          }
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
      console.log('Validating form...');
      const values = await form.validateFields();
      console.log('Form values:', values);
      
      // Validate required fields
      const requiredFields = {
        title: 'Title',
        excerpt: 'Excerpt',
        category: 'Category',
        content: 'Content'
      };

      for (const [field, label] of Object.entries(requiredFields)) {
        if (!values[field]?.trim()) {
          throw new Error(`${label} is required`);
        }
      }

      if (!Array.isArray(values.tags) || values.tags.length === 0) {
        throw new Error('At least one tag is required');
      }

      // Generate slug if not provided
      if (!values.slug?.trim()) {
        values.slug = values.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      console.log('Submitting form with values:', values);
      const url = editingPost ? `/api/blog/${editingPost.slug}` : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      console.log('API response status:', response.status);
      const data = await response.json();
      console.log('API response data:', data);
      
      if (!data.success) {
        throw new Error(data.message || 'Operation failed');
      }

      if (editingPost) {
        setPosts(posts.map(post => 
          post.slug === editingPost.slug ? { ...post, ...values } : post
        ));
        message.success('Post updated successfully');
      } else {
        const newPost = {
          ...values,
          date: values.date || new Date().toISOString().split('T')[0],
          draft: false,
        };
        setPosts([newPost, ...posts]);
        message.success('Post created successfully');
      }

      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Form submission error:', error);
      message.error(error instanceof Error ? error.message : 'Failed to save post. Please check all required fields.');
    }
  };

  const columns: ColumnsType<BlogPost> = [
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      sorter: (a, b) => a.slug.localeCompare(b.slug),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: BlogPost) => (
        <a href={`/blog/${record.slug}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="purple">{category}</Tag>,
      filters: categories.map(cat => ({ text: cat, value: cat })),
      onFilter: (value, record) => record.category === String(value),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[] | undefined) => {
        if (!tags || !Array.isArray(tags)) {
          return null;
        }
        return (
          <>
            {tags.slice(0, 2).map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {tags.length > 2 && <Tag>+{tags.length - 2}</Tag>}
          </>
        );
      },
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: BlogPost) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the post"
            description="Are you sure you want to delete this post? This action cannot be undone."
            onConfirm={async () => {
              console.log('Delete confirmed, calling API for slug:', record.slug);
              try {
                const response = await fetch(`/api/blog/${record.slug}`, {
                  method: 'DELETE',
                });
                
                console.log('Delete API response status:', response.status);
                const data = await response.json();
                console.log('Delete API response data:', data);
                
                if (data.success) {
                  setPosts(posts.filter(post => post.slug !== record.slug));
                  message.success('Post deleted successfully');
                } else {
                  message.error(data.message || 'Failed to delete post');
                }
              } catch (error) {
                console.error('Error deleting post:', error);
                message.error('Failed to delete post');
              }
            }}
            okText="Yes, Delete"
            okType="danger"
            cancelText="Cancel"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                console.log('Delete button clicked for slug:', record.slug);
              }}
            >
              Delete
            </Button>
          </Popconfirm>
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
        rowKey="slug"
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
