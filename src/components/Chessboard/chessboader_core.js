import globalState from "@/mixins/globalState.js";
import { tools_checkEvenOdd } from '@/utils/tools';

const rpx = globalState.rpx;
const halfGaps = {
  '9X9': 36,
  '13X13': 25.5,
  '15X15': 22.5,
  '19X19': 18,
}

/**
 * 获取用户输入的预期落点
 * @param {Array} pos 原始落点数据
 * @param {Strign} size 棋盘规格尺寸
 * @returns 
 */
function getDesiredPos_touch(pos, size) {
  // debugger;
  let pos_rpx = [pos.x, pos.y];

  // 计算点位的值
  pos_rpx.forEach((val, idx) => {
    // *计算坐标值有多少个 halfGap，偶数个则说明点位值绝对偏向上一个（左方或上方）点位，奇数个则说明点位值绝对偏向下一个（右方或下方）点位。
    if (size == '13X13') {
      let halfGapNum = Math.floor((val - 3) / halfGaps[size]);
      pos_rpx[idx] = (tools_checkEvenOdd(halfGapNum) == 'odd') ? (halfGapNum * halfGaps[size] + 28.5) : ((halfGapNum - 1) * halfGaps[size] + 28.5);
    }
    else {
      let halfGapNum = Math.floor(val / halfGaps[size]);
      pos_rpx[idx] = (tools_checkEvenOdd(halfGapNum) == 'odd') ? ((halfGapNum + 1) * halfGaps[size]) : (halfGapNum * halfGaps[size]);
    }
  })

  return { x: pos_rpx[0], y: pos_rpx[1] };
}

// todo 获取来自硬件的预期落点
function getDesiredPos_hardware(pos, size) { 
  // todo 前端请求等级对弈
  // todo 监听后端 socket 发来的落点数据
 }

/**
 * 落点区域判定
 * @param {Object} pos 点位
 * @param {String} size 棋盘规格
 * @returns 
 */
function checkSelection(pos, size) {
  const canSelectionArea = {
    '9X9': {
      min: 36,
      max: 684
    },
    '13X13': {
      min: 28.5,
      max: 691.5
    },
    '15X15': {
      min: 22.5,
      max: 697.5
    },
    '19X19': {
      min: 18,
      max: 702
    },
  };
  let { x, y } = pos;

  // 判定落点是否超出允许的范围
  let isOutside_x = x < canSelectionArea[size].min || x > canSelectionArea[size].max;
  let isOutside_y = y < canSelectionArea[size].min || y > canSelectionArea[size].max;
  // 判定落点是否位于点位正中间
  let isMid_x = (size == '13X13') ? ((x - 28.5) % halfGaps['13X13'] === 0) : (x % halfGaps[size] === 0);
  let isMid_y = (size == '13X13') ? ((y - 28.5) % halfGaps['13X13'] === 0) : (y % halfGaps[size] === 0);

  if (isOutside_x || isOutside_y || isMid_x || isMid_y) {
    return false;
  }
  return true;
}

/**
 * 落点查重
 * @param {Array} prePits_pos 已落点数据
 * @param {Object} curPit_pos 新落点数据
 * @returns 
 */
function checkDuplicates(prePits_pos, curPit_pos) {

  // debugger;
  let isExist = prePits_pos.some(pos => {
    return (curPit_pos.x === pos.x && curPit_pos.y === pos.y);
  })

  return isExist;
}

// todo 检查禁用点位
function checkBanPos() { }

export {
  checkDuplicates, checkSelection, getDesiredPos_touch
};

