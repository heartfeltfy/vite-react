import { Skeleton, Space, Spin } from "antd";
import { Suspense, ReactNode, CSSProperties } from "react";

export default function SkeletonLoading({ children }: { children: ReactNode }) {
  return <Suspense fallback={<SkeletonCustom />}>{children}</Suspense>;
}

export const SkeletonCustom = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Skeleton active title={false} paragraph={{ rows: 3 }} />
      <Skeleton active title={false} paragraph={{ rows: 3 }} />
    </Space>
  );
};

const SpinStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%"
};
export const GlobalLoading = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Spin style={SpinStyles} />}>{children}</Suspense>;
};
