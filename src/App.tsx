import "./App.css";
// 路由占位符
import { Outlet } from "react-router-dom";

export default function App() {
  console.log(window._CONFIG.baseURL);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}
