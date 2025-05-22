import React from 'react';
import { Table, Button, Modal, Form, Input, message, Tag } from 'antd';

const API = '/api/blogs';

export default function BlogManager() {
  const [blogs, setBlogs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<any>(null);
  const [form] = Form.useForm();

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch(API + '?page=1&pageSize=100');
    const data = await res.json();
    setBlogs(data.blogs);
    setLoading(false);
  };
  React.useEffect(() => { fetchBlogs(); }, []);

  const onEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };
  const onAdd = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };
  const onDelete = async (id: number) => {
    if (!confirm('Delete this blog?')) return;
    await fetch(API + '/' + id, { method: 'DELETE' });
    message.success('Deleted');
    fetchBlogs();
  };
  const onFinish = async (values: any) => {
    if (editing) {
      await fetch(API + '/' + editing.id, { method: 'PUT', body: JSON.stringify(values) });
      message.success('Updated');
    } else {
      await fetch(API, { method: 'POST', body: JSON.stringify(values) });
      message.success('Added');
    }
    setModalOpen(false);
    fetchBlogs();
  };
  return (
    <div>
      <Button type="primary" onClick={onAdd} className="mb-4">Add Blog</Button>
      <Table
        dataSource={blogs}
        rowKey="id"
        loading={loading}
        columns={[
          { title: 'Title', dataIndex: 'title' },
          { title: 'Category', dataIndex: 'category', render: (v: string) => <Tag>{v}</Tag> },
          { title: 'Date', dataIndex: 'date' },
          { title: 'Action', render: (_, r) => <>
            <Button size="small" onClick={() => onEdit(r)}>Edit</Button>
            <Button size="small" danger className="ml-2" onClick={() => onDelete(r.id)}>Delete</Button>
          </> },
        ]}
      />
      <Modal open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => form.submit()} title={editing ? 'Edit Blog' : 'Add Blog'}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="excerpt" label="Excerpt" rules={[{ required: true }]}><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="image" label="Image URL" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
