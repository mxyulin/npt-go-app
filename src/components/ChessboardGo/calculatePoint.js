import { checkEvenOdd } from "@/utils/tools";
// 不同棋盘的一半间隔宽
let halfGap = {
  sm: 36,
  // md: (25.5 + 3),// 一半 + 3
  md: 25.5,
  lg: 18
}

/**
 * 获取落子点位
 * @param {Array} position_rpx 落点 [x, y] 
 * @param {Strign} size 棋盘大小
 * @returns 
 */
function getCalibrationPosition(position_rpx, size) {
  // * 计算落子点位（相比张志凯的思路，我的无需进行【余数 和 间隔/2】的大小判定，也无需在余数大于 间隔/2 后给商加1）
  position_rpx.forEach((val, idx) => {

    /* 
    * 计算坐标值有多少个【间隔/2】，偶数个则说明点位值绝对偏向上一个（左方或上方）点位。
    * 奇数个则说明点位值绝对偏向下一个（右方或下方）点位。
    */
    let num = (size == 'md') ? Math.floor((val - 3) / halfGap[size]) : Math.floor(val / halfGap[size]);

    // 计算点位的值
    if (size == 'md') {
      position_rpx[idx] = (checkEvenOdd(num) == 'odd') ? (num * halfGap[size] + 28.5) : ((num - 1) * halfGap[size] + 28.5);
    }
    else {
      position_rpx[idx] = (checkEvenOdd(num) == 'odd') ? ((num + 1) * halfGap[size]) : (num * halfGap[size]);
    }
  })

  return position_rpx;
}

/**
 * 
 * @param {*} position_rpx 
 * @param {*} size 
 * @returns 
 */
function checkSelectionArea(position_rpx, size) {
  // 判定点位是否超出棋盘落子判定区域
  let isOutside = position_rpx.some(val => {
    return (size == 'md') ? (val <= 28.5) || (val >= (720 - 28.5)) : (val <= halfGap[size]) || (val >= (720 - halfGap[size]));
  });

  // 判定点位是否刚好落在棋盘点位中间
  let isMid = position_rpx.some(val => {
    // debugger;
    return (size == 'md') ? ((val - 28.5) % halfGap['md'] === 0) : (val % halfGap[size] === 0);
  })

  if (isOutside || isMid) {
    return 'no';
  }
  else {
    return 'ok'
  }
}

/**
 * * helper func --- 落子点位查重
 * @param {*} points 
 * @param {*} positon_rpx 
 * @returns 
 */
function checkDuplicates(points, positon_rpx) {
  // debugger;
  if (points.length === 0) return false;

  let isExist = false;
  isExist = points.some(point => {
    let { position } = point;

    if ((position[0] === positon_rpx[0]) && (position[1] === positon_rpx[1])) {
      return true;
    }
    else {
      return false;
    }
  })

  return isExist;
}

function checkGhost(points) { 
  
 }

export {
  checkDuplicates, checkGhost, checkSelectionArea,
  getCalibrationPosition
};

