import classes from "./Login.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/store-hooks";
import { login } from "./auth-slice";
import { useRequest } from "@/hooks/useRequest";
import { getAccessToken } from "@/api/auth";

export default function Login() {
  const { loading, error, sendHttp } = useRequest();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onFinish = async (formData: { username: string; password: string }) => {
    const username = formData.username.trim();
    const password = formData.password.trim();
    // 登录请求
    sendHttp(getAccessToken({ username: username, password: password }), result => {
      const { token: accessToken, username } = result;
      const userInfo = {
        accessToken,
        username,
        authorities: ["setting", "posts"]
      };

      authSuccess(userInfo);
    });
  };

  function authSuccess(data: { accessToken: string; username: string; authorities: string[] }) {
    navigate(from, { replace: true });
    dispatch(login(data));
  }

  return (
    <div className={classes.Login + " flex align-center justify-center"}>
      <div className={classes.Login_container}>
        <div className={classes.body}>
          <h2>Vite-React</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            initialValues={{ password: "0lelplR", username: "kminchelle" }}
          >
            <Form.Item name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
                className={classes.login_input}
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码！" }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                className={classes.login_input}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={classes.login_form_button}
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
