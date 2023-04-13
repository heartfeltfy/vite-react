import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../components/index";
import "./Layout.scss";

export default function Layout() {
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
