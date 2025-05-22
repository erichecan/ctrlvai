import React from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const API = '/api/videos';

export default function VideoManager() {
  const [videos, setVideos] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<any>(null);
  const [form] = Form.useForm();

  const fetchVideos = async () => {
    setLoading(true);
    const res = await fetch(API);
    const data = await res.json();
    setVideos(data);
    setLoading(false);
  };
  React.useEffect(() => { fetchVideos(); }, []);

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
    if (!confirm('Delete this video?')) return;
    await fetch(API + '/' + id, { method: 'DELETE' });
    message.success('Deleted');
    fetchVideos();
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
    fetchVideos();
  };
  return (
    <div>
      <Button type="primary" onClick={onAdd} className="mb-4">Add Video</Button>
      <Table
        dataSource={videos}
        rowKey="id"
        loading={loading}
        columns={[
          { title: 'Title', dataIndex: 'title' },
          { title: 'Description', dataIndex: 'description' },
          { title: 'YouTube Link', dataIndex: 'youtube' },
          { title: 'Action', render: (_, r) => <>
            <Button size="small" onClick={() => onEdit(r)}>Edit</Button>
            <Button size="small" danger className="ml-2" onClick={() => onDelete(r.id)}>Delete</Button>
          </> },
        ]}
      />
      <Modal open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => form.submit()} title={editing ? 'Edit Video' : 'Add Video'}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="youtube" label="YouTube Link" rules={[{ required: true }]}><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
