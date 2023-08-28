import apiMap from './api/index';
import Request from "./request";

const useRequest = (apikey = '', data = {}, toastBefore = '', toastAfter = false, customHeaders = {}) => {
  if (!apikey) return Promise.reject('Error: The apiKey is invalid.');
  let apiCfg = getAPI(apikey, apiMap);

  if (!apiCfg) return Promise.reject(`Error: apiCfg of '${apikey}' is not found.`);
  let { url, method, auth } = apiCfg;

  const request = new Request();

  request.interceptor.request(cfg => {
    uni.hideLoading();

    let token = uni.getStorageSync('token');
    // let refreshToken = uni.getStorageSync('refresh-token'); 登陆页初始化时判断，有就去获取 token （自动登录时设置 Refresh-Token 请求头即可），没有就让用户登录获取 refreshToken 

    if (auth) {
      if (token) {
        cfg.header['Authorization'] = token + 'npt-go-app';// 可以再用 MD5 加密
      }
      else {
        // todo 重定向登陆页
      }
    }

    for (let name in customHeaders) {
      cfg.hearder[name] = customHeaders[name];
    }

    toastBefore && uni.showLoading({
      title: toastBefore,
      mask: true
    })

    return cfg;
  })

  request.interceptor.response(res => {
    uni.hideLoading();

    res = { statusCode: 409, msg: '错误测试', data: res };// 测试代码

    let { statusCode, msg, data } = res;

    if (statusCode !== 200) {
      handelErrorCode(statusCode);

      toastAfter && uni.showToast({
        title: msg,
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }

    return data;
  })

  return request.request({
    url,
    method,
    data
  })
};

export default useRequest;

/**
 * 获取接口
 * @param {String} key - 接口键，比如 user.getUserInfo 就是获取 user 模块下 getUserInfo 接口
 * @param {Object} apiMap 
 * @returns 
 */
function getAPI(key, apiMap) {
  let keys = key.split('.');
  let api = apiMap;

  keys.forEach((key) => {
    api = api[key];
  });

  return Boolean(api) ? api : null;
}

/**
 * 处理错误码
 * @param {String} code 
 */
function handelErrorCode(code) {
  switch (code) {
    case 401:
      // todo 处理 token 过期
      break;
    case 403:
      // todo 尝试重新发起请求
      break;
  }
}
