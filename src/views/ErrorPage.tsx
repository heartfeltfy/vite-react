import { useRouteError } from "react-router-dom";
import { Header, Footer } from "@/components";
import { Layout, Typography } from "antd";

interface ErrorResponse {
  data: any;
  status: number;
  statusText: string;
  message?: string;
}

const errorCheck = (error: any): error is ErrorResponse => {
  return "data" in error && "status" in error && "statusText" in error;
};

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  if (errorCheck(error)) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Layout.Content
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography.Title level={2}>
            <p>404页面</p>
          </Typography.Title>
        </Layout.Content>
        <Footer />
      </Layout>
    );
  }
  return <></>;
}
