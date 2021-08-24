import { useEffect, useRef } from "react";

const useUpdate = (fn, dependency) => {
  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
  })
  useEffect(() => {
    if (count.current > 1) {
      fn();
    }
  }, [fn, dependency])
};

export { useUpdate };