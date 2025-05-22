import React from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const API = '/api/tools';

export default function ToolManager() {
  const [tools, setTools] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<any>(null);
  const [form] = Form.useForm();

  const fetchTools = async () => {
    setLoading(true);
    const res = await fetch(API);
    const data = await res.json();
    setTools(data);
    setLoading(false);
  };
  React.useEffect(() => { fetchTools(); }, []);

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
    if (!confirm('Delete this tool?')) return;
    await fetch(API + '/' + id, { method: 'DELETE' });
    message.success('Deleted');
    fetchTools();
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
    fetchTools();
  };
  return (
    <div>
      <Button type="primary" onClick={onAdd} className="mb-4">Add Tool</Button>
      <Table
        dataSource={tools}
        rowKey="id"
        loading={loading}
        columns={[
          { title: 'Title', dataIndex: 'title' },
          { title: 'Description', dataIndex: 'description' },
          { title: 'Logo', dataIndex: 'logo' },
          { title: 'Action', render: (_, r) => <>
            <Button size="small" onClick={() => onEdit(r)}>Edit</Button>
            <Button size="small" danger className="ml-2" onClick={() => onDelete(r.id)}>Delete</Button>
          </> },
        ]}
      />
      <Modal open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => form.submit()} title={editing ? 'Edit Tool' : 'Add Tool'}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}><Input.TextArea rows={2} /></Form.Item>
          <Form.Item name="logo" label="Logo URL" rules={[{ required: true }]}><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
