import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/home/Home";
import Goods from "../pages/goods/Goods";
import AuthProvider from "../components/auth/AuthProvider";

export default function Root() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Layout />
            </AuthProvider>
          }
        >
          <Route index element={<Home />}></Route>
          <Route path="/goods" element={<Goods />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
