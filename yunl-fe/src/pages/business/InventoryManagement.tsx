// UserManagement.tsx - 带搜索、筛选、分页的用户管理组件

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Form,
  Input,
  InputNumber,
  Space,
  message,
  Popconfirm,
  Card,
  Spin,
  Modal,
  Row,
  Col,
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "./InventoryManagement.scss";

const { Option } = Select;

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  phone?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
  filters?: any;
}

const API_URL = "http://localhost:3000/api";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 搜索/筛选状态
  const [searchKeyword, setSearchKeyword] = useState("");
  const [minAge, setMinAge] = useState<number | undefined>();
  const [maxAge, setMaxAge] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  // 分页状态
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 获取用户列表（带参数）
  const fetchUsers = async (
    page = pagination.current,
    pageSize = pagination.pageSize,
  ) => {
    setLoading(true);
    try {
      // 构建查询参数
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("pageSize", pageSize.toString());

      if (searchKeyword) params.append("keyword", searchKeyword);
      if (minAge !== undefined) params.append("minAge", minAge.toString());
      if (maxAge !== undefined) params.append("maxAge", maxAge.toString());
      if (sortBy) params.append("sortBy", sortBy);
      if (sortOrder) params.append("sortOrder", sortOrder);

      const response = await fetch(`${API_URL}/users?${params}`);
      const result: ApiResponse<User[]> = await response.json();

      if (result.success && result.data) {
        setUsers(result.data);
        if (result.pagination) {
          setPagination({
            current: result.pagination.page,
            pageSize: result.pagination.pageSize,
            total: result.pagination.total,
          });
        }
      } else {
        message.error(result.message || "获取用户列表失败");
      }
    } catch (error) {
      console.error("获取用户失败:", error);
      message.error("获取用户列表失败");
    } finally {
      setLoading(false);
    }
  };

  // 搜索/筛选
  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchUsers(1, pagination.pageSize);
  };

  // 重置筛选
  const handleReset = () => {
    setSearchKeyword("");
    setMinAge(undefined);
    setMaxAge(undefined);
    setSortBy("");
    setSortOrder("asc");
    setPagination({ current: 1, pageSize: 10, total: 0 });
    setTimeout(() => fetchUsers(1, 10), 0);
  };

  // 表格分页变化
  const handleTableChange = (newPagination: any) => {
    fetchUsers(newPagination.current, newPagination.pageSize);
  };

  // 添加用户
  const addUser = async (values: User) => {
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result: ApiResponse<User> = await response.json();

      if (result.success) {
        message.success("添加成功");
        setIsModalOpen(false);
        form.resetFields();
        fetchUsers(1, pagination.pageSize); // 回到第一页
      } else {
        message.error(result.message || "添加失败");
      }
    } catch (error) {
      console.error("添加失败:", error);
      message.error("添加用户失败");
    } finally {
      setSubmitting(false);
    }
  };

  // 修改用户
  const updateUser = async (values: User) => {
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/users/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result: ApiResponse<User> = await response.json();

      if (result.success) {
        message.success("修改成功");
        setIsModalOpen(false);
        setEditingId(null);
        form.resetFields();
        fetchUsers(pagination.current, pagination.pageSize);
      } else {
        message.error(result.message || "修改失败");
      }
    } catch (error) {
      console.error("修改失败:", error);
      message.error("修改用户失败");
    } finally {
      setSubmitting(false);
    }
  };

  // 删除用户
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });
      const result: ApiResponse<User[]> = await response.json();

      if (result.success) {
        message.success("删除成功");
        fetchUsers(pagination.current, pagination.pageSize);
      } else {
        message.error(result.message || "删除失败");
      }
    } catch (error) {
      console.error("删除失败:", error);
      message.error("删除用户失败");
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingId) {
        updateUser(values);
      } else {
        addUser(values);
      }
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingId(null);
  };

  // 初始化
  useEffect(() => {
    fetchUsers(1, 10);
  }, []);

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: true,
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      width: 100,
      sorter: true,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "操作",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除吗？"
            description={`确定要删除用户 "${record.name}" 吗？`}
            onConfirm={() => deleteUser(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-management" style={{ padding: "24px" }}>
      {/* 头部 */}
      <Card className="header-card" style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <h1 style={{ margin: 0 }}>用户管理系统</h1>
          </Col>
          <Col>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={() =>
                  fetchUsers(pagination.current, pagination.pageSize)
                }
                loading={loading}
              >
                刷新
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                添加用户
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 搜索筛选栏 */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16} align="bottom">
          <Col flex="auto">
            <Input
              placeholder="搜索姓名/邮箱/手机号"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onPressEnter={handleSearch}
              allowClear
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col>
            <InputNumber
              placeholder="最小年龄"
              value={minAge}
              onChange={(value) => setMinAge(value ?? undefined)}
              style={{ width: 100 }}
              min={0}
              max={120}
            />
          </Col>
          <Col>
            <InputNumber
              placeholder="最大年龄"
              value={maxAge}
              onChange={(value) => setMaxAge(value ?? undefined)}
              style={{ width: 100 }}
              min={0}
              max={120}
            />
          </Col>
          <Col>
            <Select
              placeholder="排序字段"
              value={sortBy || undefined}
              onChange={setSortBy}
              style={{ width: 120 }}
              allowClear
            >
              <Option value="id">按ID</Option>
              <Option value="name">按姓名</Option>
              <Option value="age">按年龄</Option>
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="排序方式"
              value={sortOrder}
              onChange={setSortOrder}
              style={{ width: 100 }}
              disabled={!sortBy}
            >
              <Option value="asc">升序</Option>
              <Option value="desc">降序</Option>
            </Select>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={handleSearch}
              icon={<SearchOutlined />}
            >
              搜索
            </Button>
          </Col>
          <Col>
            <Button onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Card>

      {/* 表格 */}
      <Card className="table-card">
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`,
              pageSizeOptions: [5, 10, 20, 50],
            }}
            onChange={handleTableChange}
          />
        </Spin>
      </Card>

      {/* 模态框 */}
      <Modal
        title={editingId ? "编辑用户" : "添加用户"}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={submitting}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              { required: true, message: "请输入姓名" },
              { min: 2, message: "姓名至少2个字符" },
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[
              { required: true, message: "请输入年龄" },
              { type: "number", min: 0, max: 120, message: "年龄在0-120之间" },
            ]}
          >
            <InputNumber
              min={0}
              max={150}
              style={{ width: "100%" }}
              placeholder="请输入年龄"
            />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: "请输入邮箱" },
              { type: "email", message: "请输入有效的邮箱地址" },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: "请输入手机号" },
              { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号" },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
