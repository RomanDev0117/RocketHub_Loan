import { useEffect, useState } from 'react';


const getLocalStorageItem = <T,>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);

    if (!item) return null;

    return item ? JSON.parse(item) as T : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): [T, (v: T) => void, () => void] => {

  const [storedValue, setStoredValue] = useState<any>(
    getLocalStorageItem<T>(key) || initialValue
  );

  useEffect(() => {
    const handleStoredValueChange = () => {
      const value = getLocalStorageItem(key);
      if (value !== storedValue) {
        // this condition doesn't work correctly for objects, not sure if it's intentional or not
        setStoredValue(value);
      }
    };

    window.addEventListener('storage', handleStoredValueChange);

    return () => {
      window.removeEventListener('storage', handleStoredValueChange);
    };
  }, []);

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('storage'));
  };

  const removeValue = () => {
    localStorage.removeItem(key);
    setValue(null as T);
    window.dispatchEvent(new Event('storage'));
  };

  return [storedValue as T, setValue, removeValue];
};
