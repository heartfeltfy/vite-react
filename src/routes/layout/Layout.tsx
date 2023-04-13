import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components/index";
import "./Layout.scss";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Layout() {
  usePageTitle("首页");
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
