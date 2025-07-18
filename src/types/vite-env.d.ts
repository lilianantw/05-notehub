// src/types/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOTEHUB_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}