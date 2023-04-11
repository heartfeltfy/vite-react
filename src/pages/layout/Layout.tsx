import { Header, Footer } from "../../components/index";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { decrement, increment, incrementAsync } from "../../features/counter/counterSlice";
import { useCountdown } from "../../hooks/useCountdown";

export default function Layout() {
  const value = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
  const { count, setCount } = useCountdown(4)
  return (
    <div className="Layout">
      <Button type="primary" onClick={() => dispatch(increment())}>增加</Button>
      {value}
      <Button type="primary" onClick={() => dispatch(decrement())}>减少</Button>
      <Header />
      <Button type="primary" onClick={() => setCount(4)}>重置定时器{count}</Button>
      <Button type="primary" onClick={() => dispatch(incrementAsync(10))}>Async</Button>
      <Footer />
    </div>
  );
}   
