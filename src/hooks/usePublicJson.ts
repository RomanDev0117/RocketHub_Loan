import { useEffect, useState } from 'react';

const state: Record<
  string,
  { loading: boolean; loaded: boolean; error: boolean; json: string }
> = {};

export const usePublicJson = (filePath: string) => {
  const [json, setJson] = useState(state[filePath]?.json);

  const loadJson = async (filePath: string) => {
    if (!state[filePath]) {
      state[filePath] = {
        loaded: false,
        loading: false,
        error: false,
        json: '',
      };
    }

    if (state[filePath].loading) {
      setTimeout(() => {
        void loadJson(filePath);
      }, 1000);
    }

    if (state[filePath].loaded) {
      setJson(state[filePath]?.json);
      return;
    }

    if (
      state[filePath].error ||
      state[filePath].json
    )
      return;

    state[filePath].loading = true;
    try {
      const response = await fetch(filePath);
      const file: string = await response.json();
      setJson(file);
    } catch (e) {
      state[filePath].error = true;
    }

    state[filePath].loading = false;
    state[filePath].loaded = true;
  };

  useEffect(() => {
    void loadJson(filePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    json,
  };
};
