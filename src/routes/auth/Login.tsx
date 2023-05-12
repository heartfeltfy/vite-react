import { Button, Form, Input, Layout, Typography, Space } from "antd";
import styles from "./login.module.scss";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { FooterView } from "@/components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/store-hook";
import { login, AuthState } from "./auth-slice";
import { getAccessToken } from "@/api/auth";
import { useRequest } from "@/hooks/useRequest";

export default function Login() {
  return (
    <Layout className={styles.login}>
      <Layout.Content className={styles.content}>
        <Layout className={styles.body}>
          <Space direction="vertical" size={24}>
            <Typography.Title level={2} style={{ textAlign: "center", marginBottom: 0 }}>
              数字法庭运维管控系统
            </Typography.Title>
            <LoginForm />
          </Space>
        </Layout>
      </Layout.Content>
      <FooterView />
    </Layout>
  );
}

function LoginForm() {
  const { loading, sendHttp } = useRequest();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onFinish = (formData: { username: string; password: string }) => {
    const username = formData.username.trim();
    const password = formData.password.trim();
    sendHttp(getAccessToken({ username, password }), (res) => {
      const { token: accessToken, username } = res.data;
      const expiresInSeconds = 1800;
      const intervalTime = Math.floor(new Date().getTime() / 1000);
      const userInfo = {
        accessToken,
        refreshToken: accessToken,
        username,
        authorities: ["penal", "device", "system", "log"],
        expiresIn: expiresInSeconds + intervalTime
      };

      // 登录成功
      submitSuccess(userInfo);
    });
  };

  // 登录成功
  function submitSuccess(data: AuthState) {
    navigate(from, { replace: true });
    dispatch(login(data));
  }
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ password: "0lelplR", username: "kminchelle" }}
      onFinish={onFinish}
    >
      <Form.Item name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
        <Input
          placeholder="用户名"
          prefix={<AiOutlineUser className="site-form-item-icon" />}
          className={styles.login__form_input}
        />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: "请输入密码！" }]}>
        <Input
          type="password"
          prefix={<AiOutlineLock className="site-form-item-icon" />}
          placeholder="密码"
          className={styles.login__form_input}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.login__form_button} loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
