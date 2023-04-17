import "./Login.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/store-hooks";
import { login } from "./authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  // 验证规则通过的成功回调
  const onFinish = async (values: any) => {
    navigate(from, { replace: true });
    dispatch(login(values));
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
