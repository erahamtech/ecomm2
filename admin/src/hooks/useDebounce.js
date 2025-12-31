import { useRef, useState, useEffect, useCallback } from "react";

export default function useDebounce(asyncFunction, delay = 500) {
  const timerRef = useRef(null);
  const isMounted = useRef(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      clearTimeout(timerRef.current);
    };
  }, []);

  const debouncedFunction = useCallback(
    async (...args) => {
      clearTimeout(timerRef.current);

      return new Promise((resolve, reject) => {
        timerRef.current = setTimeout(async () => {
          try {
            setLoading(true);
            const result = await asyncFunction(...args);
            setLoading(false);
            if (isMounted.current) {
              resolve(result);
            }
          } catch (error) {
            if (isMounted.current) {
              setLoading(false);
              reject(error);
            }
          }
        }, delay);
      });
    },
    [asyncFunction, delay]
  );

  return [debouncedFunction, loading];
}
