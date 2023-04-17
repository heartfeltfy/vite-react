import { useAppDispatch, useAppSelector } from "../../store-hooks";
import { useNavigate } from "react-router-dom";
import { getStorage, logout } from "@/routes/auth/authSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const username = useAppSelector(state => state.auth.username) || (getStorage() && getStorage().username);

  const signout = async () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };
  return (
    <div className="Header">
      <h1 onClick={signout}>Header--{username}---权限修改</h1>
    </div>
  );
}
