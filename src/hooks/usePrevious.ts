import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    if (ref.current !== value) {
      ref.current = value;
    }
  }, [value]);
  return ref.current;
}