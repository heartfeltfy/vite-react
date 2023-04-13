import { signout } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const username = useAppSelector(state => state.user.username) || localStorage.getItem("username");

  const logout = async () => {
    await dispatch(signout());
    navigate("/login", { replace: true });
  };
  return (
    <div className="Header">
      <h1 onClick={logout}>Header--{username}---权限修改</h1>
    </div>
  );
}
