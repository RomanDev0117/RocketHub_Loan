import { useSearchParams } from 'react-router-dom';

export const useSimpleSearchQueryState = <T>(
  name: string,
  defaultValue: T
): [T, (arg: T) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = (searchParams.get(name) as T) || defaultValue;

  const setValue = (type: T | string) => {
    searchParams.set(name, type as string);
    setSearchParams(searchParams);
  };

  return [value, setValue];
};
