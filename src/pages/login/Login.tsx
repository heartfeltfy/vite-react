import "./Login.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

export default function Login() {
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <div className="Login flex align-center justify-center">
      <div className="Login-container">
        <div className="body">
          <h2>Vite-React</h2>
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
                className="login-input"
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码！" }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                className="login-input"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
