import { useAppSelector } from '../../app/hooks'
export default function Header() {

  const username = useAppSelector(state => state.user.username)

  return <div className="Header">Header==={username}</div>;
}
