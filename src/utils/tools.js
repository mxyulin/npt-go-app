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

export { tools_checkEvenOdd };

