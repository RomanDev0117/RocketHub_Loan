/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_USE_RAW_TRANSLATIONS: string;
  readonly REACT_APP_ENABLE_REDUX_DEV_TOOLS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}