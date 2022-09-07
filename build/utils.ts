export function wrapperEnv(env: Recordable): ViteEnv {
  const ret: any = {};
  Object.keys(env).map((i) => {
    let realName = env[i].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (i === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (i === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }
    ret[i] = realName;
  });
  return ret;
}
