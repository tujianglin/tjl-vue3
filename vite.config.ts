import { defineConfig, loadEnv } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { pick } from 'lodash-es';
import dayjs from 'dayjs';
import { resolve } from 'path';

import { wrapperEnv } from './build/utils';
import pkg from './package.json';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
const __APP_INFO__ = {
  pkg: pick(pkg, ['name', 'version']),
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT } = viteEnv;
  const _ = command === 'build';
  return {
    // 服务器
    server: {
      host: true,
      port: VITE_PORT,
    },
    // css 配置
    css: {
      preprocessorOptions: {
        less: {
          // 全局样式
          modifyVars: {
            '@color': 'red',
          },
        },
      },
    },
    // 地址别名
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    // 定义全局常量
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    // 插件
    plugins: [vue(), vueJsx()],
  };
});
