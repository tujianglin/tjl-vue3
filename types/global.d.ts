/// <reference types="vite/client" />

/* 全局常量 */
declare const __APP_INFO__: string;

/* 全局类型 */
declare type Recordable<T = any> = Record<string, T>;

/* 环境变量 */
declare interface ViteEnv {
  VITE_PORT: number;
  VITE_APP_NAME: string;
  VITE_PROXY: [string, string][];
}

/* 定义vue模块类型 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
