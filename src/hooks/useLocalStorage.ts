import { useState, useEffect } from "react";

function useLocalStorage(key: string, initialValue: string) {
  const [state, setState] = useState(() => {
    try {
      const val = localStorage.getItem(key);

      if (val) {
        return JSON.parse(val);
      } else {
        return initialValue;
      }
    } catch (err: unknown) {
      console.error(err);

      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
