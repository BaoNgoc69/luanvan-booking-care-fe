import { Button, Col, Form, Input, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getProfile } from "../../../../services/userService";
import { globalState$ } from "../../../../rxjs/store";

const UserInfor = () => {
  const [form] = Form.useForm();
  const [id, setId] = React.useState(2);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState({
    getProfile: false,
  });

  useEffect(() => {
    (async () => {
      const currentUser = globalState$.value?.user;
      setLoading({
        ...loading,
        getProfile: true,
      });
      try {
        const res = await getProfile(currentUser?.id || null);
        setUser(res?.data?.user);

        form.setFieldsValue({ ...user });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading({
          ...loading,
          getProfile: false,
        });
      }
    })();
  }, [id, user?.id]);

  const onFinish = (data) => {
    console.log(data);
  };

  return (
    <div className="profile-info">
      <Spin spinning={loading.getProfile}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }, { type: "email" }]}
              >
                <Input placeholder="email" />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="phonenumber"
                label="Phone Number"
                rules={[{ required: true }]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true }]}
              >
                <Input.TextArea placeholder="Address" rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default UserInfor;
