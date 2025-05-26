'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Table, Button, Space, Tag, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AdminLayout from '@/components/admin/AdminLayout';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface LearningVideo {
  id: string;
  title: string;
  desc: string;
  youtube_url: string;
  tags?: string[];
  category?: string;
}

const LearningAdminPage = () => {
  const [videos, setVideos] = useState<LearningVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVideo, setEditingVideo] = useState<LearningVideo | null>(null);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetchVideos();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/learning');
      const data = await response.json();
      if (data.success) {
        setVideos(data.videos);
      } else {
        message.error('Failed to fetch learning videos');
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      message.error('An error occurred while fetching learning videos');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use the existing categories from videos
      const response = await fetch('/api/learning');
      const data = await response.json();
      if (data.success) {
        const uniqueCategories = Array.from(
          new Set(
            data.videos
              .map((video: LearningVideo) => video.category)
              .filter(Boolean)
          )
        );
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTags = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll use the existing tags from videos
      const response = await fetch('/api/learning');
      const data = await response.json();
      if (data.success) {
        const allTags = data.videos.flatMap((video: LearningVideo) => video.tags || []);
        const uniqueTags = Array.from(new Set(allTags));
        setTags(uniqueTags);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleEdit = (video: LearningVideo) => {
    setEditingVideo(video);
    form.setFieldsValue({
      ...video,
      tags: video.tags || [],
    });
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this video?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          // In a real app, this would be an API call
          // For now, we'll just update the local state
          setVideos(videos.filter(video => video.id !== id));
          message.success('Video deleted successfully');
        } catch (error) {
          console.error('Error deleting video:', error);
          message.error('Failed to delete video');
        }
      },
    });
  };

  const handleCreate = () => {
    setEditingVideo(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingVideo) {
        // Update existing video
        const updatedVideo = { ...editingVideo, ...values };
        // In a real app, this would be an API call
        setVideos(videos.map(video => video.id === editingVideo.id ? updatedVideo : video));
        message.success('Video updated successfully');
      } else {
        // Create new video
        const newVideo = {
          ...values,
          id: `video_${Date.now()}`,
        };
        // In a real app, this would be an API call
        setVideos([newVideo, ...videos]);
        message.success('Video created successfully');
      }
      
      setModalVisible(false);
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  // Extract YouTube ID from URL
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const columns = [
    {
      title: 'Thumbnail',
      key: 'thumbnail',
      render: (_: any, record: LearningVideo) => {
        const videoId = getYoutubeId(record.youtube_url);
        return videoId ? (
          <img 
            src={`https://img.youtube.com/vi/${videoId}/default.jpg`} 
            alt={record.title}
            style={{ width: '120px', height: '90px', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '120px', height: '90px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            No Preview
          </div>
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: LearningVideo) => (
        <a href={record.youtube_url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => category ? <Tag color="purple">{category}</Tag> : '-',
      filters: categories.map(cat => ({ text: cat, value: cat })),
      onFilter: (value: string, record: LearningVideo) => record.category === value,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[] = []) => (
        <>
          {tags.slice(0, 2).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {tags.length > 2 && <Tag>+{tags.length - 2}</Tag>}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: LearningVideo) => (
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
    <AdminLayout selectedKey="learning">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Learning Videos Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleCreate}
          className="bg-[#1976D2]"
        >
          Add New Video
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={videos} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingVideo ? 'Edit Learning Video' : 'Add New Learning Video'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        okText={editingVideo ? 'Update' : 'Create'}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the video title' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="desc"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          
          <Form.Item
            name="youtube_url"
            label="YouTube URL"
            rules={[
              { required: true, message: 'Please enter the YouTube URL' },
              { 
                pattern: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/, 
                message: 'Please enter a valid YouTube URL' 
              }
            ]}
          >
            <Input placeholder="e.g., https://youtu.be/abcdefghijk or https://www.youtube.com/watch?v=abcdefghijk" />
          </Form.Item>
          
          <Form.Item
            name="category"
            label="Category"
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
            name="tags"
            label="Tags"
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
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default LearningAdminPage;
