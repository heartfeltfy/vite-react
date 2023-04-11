import { useEffect, useState } from "react";

/**
 *
 * @param initCount     初始化数据(秒)
 * @param interval      定时器执行间隔(毫秒)
 */
export const useCountdown = (initCount: number, interval = 1000) => {
  const [count, setCount] = useState(initCount);
  let timer: ReturnType<typeof setInterval>;

  useEffect(() => {
    if (initCount > 0) {
      timer = setInterval(() => {
        setCount(prev => {
          if (prev < 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, interval);
    }
    return () => {
      clearInterval(timer);
    };
  }, [count]);
  return { count, setCount };
};
