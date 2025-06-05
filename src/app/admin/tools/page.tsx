'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Typography, Table, Button, Space, Tag, Modal, Form, Input, Select, Switch, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AdminLayout from '@/components/admin/AdminLayout';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import type { Key } from 'antd/es/table/interface';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface AITool {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
  isPaid: boolean;
  features: string[];
  tags: string[];
  category: string;
}

const ToolsAdminPage = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTool, setEditingTool] = useState<AITool | null>(null);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetchTools();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tools');
      const data = await response.json();
      if (data.success) {
        setTools(data.tools);
      } else {
        message.error('Failed to fetch AI tools');
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
      message.error('An error occurred while fetching AI tools');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/tools');
      const data = await response.json();
      if (data.success) {
        const uniqueCategories = Array.from(
          new Set(
            data.tools.map((tool: AITool) => tool.category)
          )
        ) as string[];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/tools');
      const data = await response.json();
      if (data.success) {
        const allTags = data.tools.flatMap((tool: AITool) => tool.tags) as string[];
        const uniqueTags = Array.from(new Set(allTags));
        setTags(uniqueTags);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleEdit = (tool: AITool) => {
    setEditingTool(tool);
    form.setFieldsValue({
      ...tool,
      features: tool.features.join('\n'),
    });
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this tool?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const response = await fetch('/api/tools', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          });
          
          const data = await response.json();
          if (data.success) {
            setTools(tools.filter(tool => tool.id !== id));
            message.success('Tool deleted successfully');
          } else {
            message.error(data.error || 'Failed to delete tool');
          }
        } catch (error) {
          console.error('Error deleting tool:', error);
          message.error('Failed to delete tool');
        }
      },
    });
  };

  const handleCreate = () => {
    setEditingTool(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Convert features from string to array
      const features = values.features.split('\n').filter((feature: string) => feature.trim() !== '');
      
      const toolData = {
        ...values,
        features,
        id: editingTool?.id || `tool_${Date.now()}`,
      };
      
      const method = editingTool ? 'PUT' : 'POST';
      const response = await fetch('/api/tools', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toolData),
      });
      
      const data = await response.json();
      if (data.success) {
        if (editingTool) {
          setTools(tools.map(tool => tool.id === editingTool.id ? data.tool : tool));
          message.success('Tool updated successfully');
        } else {
          setTools([data.tool, ...tools]);
          message.success('Tool created successfully');
        }
        setModalVisible(false);
      } else {
        message.error(data.error || `Failed to ${editingTool ? 'update' : 'create'} tool`);
      }
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  const columns: (ColumnGroupType<AITool> | ColumnType<AITool>)[] = [
    {
      title: 'Logo',
      key: 'logo',
      render: (_: unknown, record: AITool) => (
        <div style={{ width: '40px', height: '40px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
          {record.logo ? (
            <Image 
              src={record.logo} 
              alt={record.name}
              fill
              sizes="40px"
              style={{ objectFit: 'contain' }}
            />
          ) : (
            record.name.charAt(0)
          )}
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: AITool) => (
        <a href={record.url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="purple">{category}</Tag>,
      filters: categories.map(cat => ({ text: cat, value: cat })),
      onFilter: (value: boolean | Key, record: AITool) => record.category === String(value),
    },
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid: boolean) => (
        <Tag color={isPaid ? 'red' : 'green'}>
          {isPaid ? 'Paid' : 'Free'}
        </Tag>
      ),
      filters: [
        { text: 'Free', value: false },
        { text: 'Paid', value: true },
      ],
      onFilter: (value: boolean | Key, record: AITool) => record.isPaid === Boolean(value),
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
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: AITool) => (
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
  ] as const;

  return (
    <AdminLayout selectedKey="tools">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>AI Tools Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleCreate}
          className="bg-[#1976D2]"
        >
          Add New Tool
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={tools} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingTool ? 'Edit AI Tool' : 'Add New AI Tool'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
        okText={editingTool ? 'Update' : 'Create'}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tool Name"
            rules={[{ required: true, message: 'Please enter the tool name' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="url"
              label="Website URL"
              rules={[
                { required: true, message: 'Please enter the website URL' },
                { type: 'url', message: 'Please enter a valid URL' }
              ]}
            >
              <Input placeholder="e.g., https://www.example.com" />
            </Form.Item>
            
            <Form.Item
              name="logo"
              label="Logo URL"
              rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
            >
              <Input placeholder="e.g., /images/tools/logo.png" />
            </Form.Item>
          </div>
          
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
              name="isPaid"
              label="Pricing"
              valuePropName="checked"
            >
              <Switch 
                checkedChildren="Paid" 
                unCheckedChildren="Free" 
              />
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
            name="features"
            label="Features (One per line)"
            rules={[{ required: true, message: 'Please enter at least one feature' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Enter features, one per line
e.g., Natural language processing
Content generation
Question answering"
            />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default ToolsAdminPage;