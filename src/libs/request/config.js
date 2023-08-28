const defaultConfig = {
  baseURL: 'http://localhost:8000',// 本地测试域名不需要 https 协议
  url: '',
  method: 'POST',
  header: { 'Content-Type': 'application/json; charset=utf-8' },
  timeout: 10000,
  dataType: 'json',
  responseType: 'text',

  // #ifdef APP-PLUS
  sslVerify: true,
  firstIpv4: false,
  // #endif

  // #ifdef H5
  withCredentials: true,
  // #endif

}

export default defaultConfig;
