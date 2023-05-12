import { CSSProperties, ReactNode, Suspense } from "react";
import { Skeleton, Space, Spin } from "antd";

export default function SuspenseLoading({ children }: { children: ReactNode }) {
  return <Suspense fallback={<SkeletonLoading />}>{children}</Suspense>;
}

export function SkeletonLoading() {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Skeleton active title={false} paragraph={{ rows: 3 }} />
      <Skeleton active paragraph={{ rows: 1, width: "40%" }} />
      <Skeleton active title={false} paragraph={{ rows: 3 }} />
    </Space>
  );
}

export const SpinStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
};
export const FullLoading = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Spin style={SpinStyles} />}>{children}</Suspense>;
};
