import { clone, merge } from 'lodash-es';

import { CreateAxiosOptions } from '/#/axios';
import { Axios } from './axios';
import { transform } from './axiosTransform';
import { Base64 } from 'js-base64';

const { VITE_GLOB_API_URL } = import.meta.env;

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new Axios(
    merge(
      {
        authenticationScheme: 'bearer',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Basic ${Base64.encode(`saber:saber_secret`)}`,
        },
        /** 数据处理方法 */
        transform: clone(transform),
        /** 配置项 */
        requestOptions: {
          /** 是否拼接请求 */
          joinPrefix: true,
          /** 请求代理 */
          urlPrefix: VITE_GLOB_API_URL,
          /** params 添加时间戳 */
          joinTime: false,
          /** 是否返回原始响应头 */
          isReturnNativeResponse: false,
          /** 是否获取 res.data 的数据 */
          isReturnOneResponse: false,
          /** 是否获取 res.data.data 的数据 */
          isTransformResponse: true,
        },
      },
      opt || {},
    ),
  );
}

export const defHttp = createAxios();
