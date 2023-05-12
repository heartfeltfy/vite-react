import { ReactNode } from "react";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/zh_CN";
import { ConfigProvider, App } from "antd";

export default function AndDesign({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider locale={locale}>
      <App style={{ height: "100%" }}>{children}</App>
    </ConfigProvider>
  );
}
