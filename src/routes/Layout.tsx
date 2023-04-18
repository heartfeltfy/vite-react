import { Footer, Header } from "@/components";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="LayoutContainer">
      <Header />
      <>
        <Outlet />
      </>
      <Footer />
    </div>
  );
}
