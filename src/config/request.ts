import Axios, {AxiosResponse} from 'axios';
import {configure} from 'axios-hooks';
import {LRUCache} from 'lru-cache';
import {first, isEqual} from 'lodash';
import {store} from '@/store';
import { AuthActionsType } from '@/store/types/authType';

const JSON_HEADER = 'application/json';
const REQ_TIMEOUT = 10 * 60 * 1000; // 10 minutes

export const apiCache = new (LRUCache as any)({max: 500, ttl: 1000 * 60 * 5});
const baseUrl = process.env.API_URL;

const instance = Axios.create({
  baseURL: baseUrl,
  timeout: REQ_TIMEOUT,
});

instance.defaults.headers.common.Accept = JSON_HEADER;
instance.defaults.headers.common['Content-Type'] = JSON_HEADER;

instance.interceptors.request.use(
  async config => {

    config.headers['req-scope'] = 'MOBILEMED-FE';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  async (response: AxiosResponse<Record<string, any>>) => {
    return response;
  },
  async error => {
    if (error instanceof Axios.Cancel && !error.message) {
      error.message = 'Request cancelled';
    }

    const UnAuthorizeResponse = [
      'Invalid or expired token',
      'Please authenticate',
    ];
    console.log(error.response.data?.message);

    if (UnAuthorizeResponse.includes(error.response.data?.message)) {
      apiCache.clear();
      store.dispatch({
        type: AuthActionsType.LOGOUT,
      });
    }

    const errorResponseMessage =
      error?.response?.data?.message || error?.response?.data?.errorMessage;
    // const shouldSilentError = error?.response?.data?.meta?.silent;
    const errorMessage =
      typeof errorResponseMessage === 'string'
        ? errorResponseMessage
        : (first(Object.values(errorResponseMessage || {})) as string);

    const isUserLackPermissionForRequestedResource =
      isEqual(errorMessage, "You don't have permission for this resource") ||
      isEqual(errorMessage, 'You do not have access to this resource');
    // Ignore showing notification for permission related msg
    if (isUserLackPermissionForRequestedResource) {
      return Promise.reject(error);
    }
    return Promise.reject({...error, message: error.response.data?.message});
  },
);

configure({axios: instance, cache: apiCache});

export default instance;
