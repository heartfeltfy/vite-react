import { Header, Footer } from "../../components/index";
import { useCountdown } from "../../hooks/useCountdown";
import { Button } from "antd";
export default function Layout() {
  const { count, reset } = useCountdown(10 * 1000);
  return (
    <div className="Layout">
      {count / 1000}
      <Button type="primary" onClick={() => reset()}>
        重置定时器
      </Button>
      <Header />
      <Footer />
    </div>
  );
}
