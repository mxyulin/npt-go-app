import { tools_checkEvenOdd } from '@/utils/tools';

const halfGaps = {
  '9X9': 36,
  '13X13': 25.5,
  '15X15': 22.5,
  '19X19': 18,
}

/**
 * 获取用户点触的预期落点
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
  };// 可落子区域坐标值
  let { x, y } = pos;

  if (isOutSide(x) || isOutSide(y) || isMid(x) || isMid(y)) {
    return false;
  }
  return true;

  // 判断坐标值是否超出可落子区域
  function isOutSide(val) {
    return  val < canSelectionArea[size].min || val > canSelectionArea[size].max; 
  }
  // 判断坐标值是否在两点中央
  function isMid(val) {
    if (val <= canSelectionArea[size].min || val >= canSelectionArea[size].max) return false;// 坐标在可落子区域坐标值上或者之外范围外的肯定不属于两点中央坐标
    val = val - canSelectionArea[size].min;// 以可落子区域坐标值作为起始的坐标值
    return val % (2 * halfGaps[size]) === 0;// 坐标值等于两个 halfGap 的肯定是两点中央坐标
  }
}

/**
 * 落点查重
 * @param {Array} prePointsPos 本局对弈已落点
 * @param {Object} curPointPos 新的落点
 * @returns 
 */
function checkDuplicates(prePointsPos, curPointPos) {
  // debugger;
  return prePointsPos.some(pos => {
    return curPointPos.x === pos.x && curPointPos.y === pos.y;
  })
}

// todo 检查禁用点位
function checkBanPos() { }

export {
  checkDuplicates, checkSelection, getDesiredPos_touch
};

