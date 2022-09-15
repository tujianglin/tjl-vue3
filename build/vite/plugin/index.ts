import { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

import { configStyleImportPlugin } from './styleImport';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {} = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx(), vueSetupExtend()];

  isBuild && vitePlugins.push(legacy());

  vitePlugins.push(configStyleImportPlugin());

  return vitePlugins;
}
