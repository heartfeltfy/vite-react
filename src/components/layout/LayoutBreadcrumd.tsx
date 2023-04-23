import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { Dispatch, ReactNode, SetStateAction, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

export default function LayoutBreadcrumb({
  paths,
  collapsed,
  setCollapsed
}: {
  paths: PathType[];
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}) {
  const items = itemRender(matchBreadTitle(paths));
  return (
    <div className="flex align-center" style={{ marginBottom: 20, gap: "1em" }}>
      <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Breadcrumb items={items}></Breadcrumb>
    </div>
  );
}

export interface PathType {
  title: string;
  url: string;
}

// 处理面包屑组件可点击跳转
function itemRender(paths: PathType[]) {
  return useMemo(() => {
    const nextItemRender = paths
      .map(({ title, url }) => {
        return {
          title: <Link to={url}>{title}</Link>
        };
      })
      .filter(v => v.title.props.to !== "/");

    return [{ title: <Link to="/">首页</Link> }].concat(nextItemRender);
  }, [JSON.stringify(paths)]);
}

const breadcrumbData: { [key: string]: string } = {
  "/user/add": "新增用户"
};

function matchBreadTitle(paths: PathType[]): PathType[] {
  const matchings: PathType[] = [];
  for (const path of paths) {
    matchings.push({ url: path.url, title: breadcrumbData[path.url] || path.title });
  }
  return matchings;
}
