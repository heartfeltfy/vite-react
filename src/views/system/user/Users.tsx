import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  return (
    <>
      用户列表
      <Button type="primary" onClick={() => navigate("/user/add")}>
        新增用户
      </Button>
    </>
  );
}
