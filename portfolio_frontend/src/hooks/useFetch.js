import { useEffect, useState, useCallback } from "react";

/**
 * PUBLIC_INTERFACE
 * useFetch
 * A lightweight hook to call an async function and manage loading/error/data.
 * @param {Function} fn - async function returning data (already parsed)
 * @param {Array<any>} deps - dependencies to re-run effect
 * @param {any} [initialData] - initial data to seed state
 * @returns {{data:any, loading:boolean, error:Error|null, reload:Function}}
 */
export function useFetch(fn, deps = [], initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(Boolean(!initialData));
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn();
      // If backend wraps data, unpack if shape is { status, data }
      if (res && typeof res === "object" && "data" in res) {
        setData(res.data);
      } else {
        setData(res);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, reload: execute };
}
