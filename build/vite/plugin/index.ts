import { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {} = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx(), vueSetupExtend()];

  isBuild && vitePlugins.push(legacy());

  return vitePlugins;
}
