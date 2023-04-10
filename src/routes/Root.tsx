import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Layout from "../pages/layout/Layout";
import ErrorPage from "../pages/ErrorPage";

export default function Root() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
