import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./user-login.scss";
import { globalState$ } from "../../../rxjs/store";
import userApi from "../../../api/userApi.";
import { useHistory } from "react-router";

const UserLogin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await userApi.login(values);

      if (res?.errCode === 0) {
        setUser(res?.user);
        globalState$.next({ ...globalState$.value, user: res?.user });
        localStorage.setItem("booking-user", JSON.stringify(res?.user));
        message.success("Login successfully!");
        history.push("/home");
      } else {
        message.error("Invalid credentials!");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login">
      <div className="user-login-container">
        <h3 className="user-login-container-title">login</h3>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UserLogin;
