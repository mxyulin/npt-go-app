/**
 * 检查奇数偶数
 * @param {Number} num 
 * @returns 
 */
function tools_checkEvenOdd(num) {
  if (typeof num !== 'number') {
    throw new Error('num must be Number --- checkEvenOdd');
  }

  num = Math.round(num);// 取整

  return num % 2 === 0 ? 'even' : 'odd';
}

/**
 * 防抖
 * @param {Function} func 
 * @param {Number} wait 
 * @param {Boolean} immediate 立刻执行
 * @returns 
 */
function tools_debounce(func, wait, immediate) {
  let timeout; // 定义一个变量来存储定时器的 ID

  return function () {
    const context = this, // 保存 this 的值
      args = arguments; // 保存函数的参数

    const later = function () { // 定义一个函数，用于在 wait 时间后执行 func 函数
      timeout = null; // 清空定时器的 ID
      if (!immediate) func.apply(context, args); // 如果 immediate 为 false，则执行 func 函数
    };

    clearTimeout(timeout); // 清空定时器
    timeout = setTimeout(later, wait); // 设置定时器，wait 时间后执行 later 函数

    const callNow = immediate && !timeout; // 如果 immediate 为 true 并且 timeout 为 null，则立即执行 func 函数
    if (callNow) func.apply(context, args); // 如果 callNow 为 true，则立即执行 func 函数
  };
}

/**
 * 节流
 * @param {Function} func 
 * @param {Number} wait 
 * @returns 
 */
function tools_throttle(func, wait) {
  let timeout; // 定义一个变量来存储定时器的 ID

  return function () {
    const context = this, // 保存 this 的值
      args = arguments; // 保存函数的参数

    if (!timeout) { // 如果不处于节流状态，则执行 func 函数，wait 时间后将 timeout 设为 null
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

/**
 * 判断请求路径
 * @param {String} url 
 * @returns 
 */
const tool_isURL = (url) => /(http|https):\/\/([\w.]+\/?)\S*/.test(url);

export { tool_isURL, tools_checkEvenOdd, tools_debounce, tools_throttle };
