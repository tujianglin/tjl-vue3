export function wrapperEnv(env: Recordable): ViteEnv {
  const ret: any = {};
  Object.keys(env).map((i) => {
    let realName = env[i].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;
    if (i === "VITE_PORT") {
      realName = Number(realName);
    }
    ret[i] = realName;
  });
  return ret;
}
