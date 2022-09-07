import type { AxiosResponse } from 'axios';
import { isString } from 'lodash-es';

import { Result, RequestOptions, AxiosTransform } from '/#/axios';
import { RequestEnum } from '/@/enums/httpEnum';
// import { joinTimestamp } from './helper';
import { getToken } from '/@/utils/auth';
import { checkStatus } from './checkStatus';

export const transform: AxiosTransform = {
  /** 处理请求数据, 如果数据不是语气格式, 可直接抛出错误 */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isReturnNativeResponse, isReturnOneResponse, isTransformResponse } = options;
    if (isReturnNativeResponse) {
      return res;
    }
    if (isReturnOneResponse) {
      return res.data;
    }
    if (isTransformResponse && (res.data as any).data) {
      return (res.data as any).data;
    }

    const { data } = res;

    if (!data) {
      throw new Error('请求出错,请稍后重试');
    }
    const { code, data: result, msg } = data;
    if (code === 200) {
      return result;
    }
    if (msg) {
    }
    throw new Error(msg || '请求出错,请稍后重试');
  },
  /** 请求拦截器处理 */
  requestInterceptors: (config, options) => {
    const token = getToken();
    if (token) {
      (config as Recordable).headers['Blade-Auth'] = `${options.authenticationScheme} ${token}`;
    }
    return config;
  },
  responseInterceptorsCatch: (_, error: any) => {
    const { response } = error || {};
    const msg: string = response?.data?.msg ?? '';
    checkStatus(response?.data?.code, msg);
    return Promise.reject(error);
  },
  /** 请求之前处理config */
  beforeRequestHook: (config, options) => {
    const { joinPrefix, urlPrefix } = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        // config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
        config.params = Object.assign(params || {});
      } else {
        // 兼容restful风格
        // config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.url = config.url + params;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        config.data = data;
        config.params = params;
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },
};
