import { tool_isURL } from '@/utils/tools';
import defaultConfig from './config';

class Request {
  constructor() {
    this.interceptor = {
      request: cb => {
        if (typeof cb == 'function') {
          this.#requestBefore = cb;
        }
      },

      response: cb => {
        if (typeof cb == 'function') {
          this.#responAfter = cb;
        }
      }
    }
  }

  #requestBefore = (config) => config;
  #responAfter = (response) => response;

  async request(apiConfig = {}) {
    // 合并默认配置和接口配置
    let config = { ...defaultConfig, ...apiConfig };
    config = this.#requestBefore(config);

    // 合并完整的请求 URL
    config.url = mergeURL(config.baseURL, apiConfig.url);

    // 用 Promise 拿请求结果
    return new Promise((resolve, reject) => {
      config.success = res => {
        res = this.#responAfter(res.data);
        resolve(res);
      }

      config.fail = err => {
        res = this.#responAfter(err);
        reject(res);
      }

      uni.request(config);
    })

    function mergeURL(baseURL, apiURL) {
      let isURL = tool_isURL(apiURL);
      let fullURL = isURL ? apiURL : baseURL + apiURL;

      return fullURL;
    }
  }
}

export default Request;
