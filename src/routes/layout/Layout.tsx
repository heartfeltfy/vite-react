import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components/index";
import "./Layout.scss";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/auth";
import { useRequest } from "@/hooks/useRequest";

export default function Layout() {
  usePageTitle("首页");
  const [lists, setLists] = useState([]);
  const { loading, error, sendHttp } = useRequest();

  useEffect(() => {
    if (lists.length > 0) return;
    const controller = getData();

    return () => {
      controller.abort();
      setLists([]);
    };
  }, []);

  // 获取数据
  function getData() {
    return sendHttp(getProducts(), setLists);
  }
  return (
    <div className="Layout flex flex-column">
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
