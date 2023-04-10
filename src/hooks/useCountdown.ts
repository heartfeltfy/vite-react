import { useEffect, useReducer } from "react";
import { useCallback } from "react";
import { useState } from "react";

/**
 *
 * @param initCount     初始化数据(毫秒)
 * @param interval      定时器执行间隔(毫秒)
 */
let timer: ReturnType<typeof setTimeout>;
export const useCountdown = (initCount: number, interval = 1000) => {
  const [count, setCount] = useState(initCount);

  // 一个增长的计时器，用于重置倒计时
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  // 设置定时器
  const setTimer = () => {
    timer = setTimeout(() => {
      setCount(prev => {
        if (prev <= 1000) {
          console.log("倒计时时间完毕！");
          clearTimer();
          return 0;
        }
        return prev - interval;
      });
      setTimer();
    }, interval);
  };

  // 清除定时器
  const clearTimer = () => {
    clearTimeout(timer);
  };
  const reset = useCallback(() => {
    setCount(initCount);
    forceUpdate();
  }, [initCount]);

  useEffect(() => {
    console.log("useCountdown：创建定时器");
    setTimer();
    return () => {
      console.log("useCountdown：销毁定时器");
      clearTimer();
    };
  }, [interval, ignored]);

  return { count, reset, ignored };
};
