import { Button } from "antd";
import { useNavigate } from "react-router-dom";
export default function AddNewUsers() {
  const navigate = useNavigate();
  return (
    <>
      新增用户
      <Button type="primary" onClick={() => navigate("/user")}>
        返回列表页
      </Button>
    </>
  );
}
