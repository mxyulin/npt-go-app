import globalState from "@/mixins/globalState.js";
import { checkEvenOdd } from "@/utils/tools";
let rpx = globalState.rpx;// 屏宽/750
// 不同棋盘的一半间隔宽
let halfGap = {
  sm: 36,
  // md: (25.5 + 3),// 一半 + 3
  md: 25.5,
  lg: 18
}
// 棋盘可落子区域宽度
let canUseAreaWidth = {
  sm: 72 * 9,
  md: 51 * 13,
  lg: 36 * 19
}

/**
 * 
 * @param {Object} ctx 画布（700*700rpx）
 * @param {String} size 棋盘尺寸（围棋）：大（19*19），中（），小（）
 * @param {Number} width 边框宽度（单位rpx）
 */
function drawBox(ctx, size, width) {
  // ctx.beginPath()

  if (ctx) {
    // 设置边框样式
    ctx.setLineWidth(width * rpx);
    ctx.setLineCap('round');
    ctx.setLineJoin('round');
    ctx.setStrokeStyle('#ae7f53');

    // 绘制棋盘边框
    switch (size) {
      case 'sm':
        ctx.strokeRect(72 * rpx, 72 * rpx, 576 * rpx, 576 * rpx);
        break;
      case 'md':
        ctx.strokeRect(54 * rpx, 54 * rpx, 612 * rpx, 612 * rpx);
        break;
      case 'lg':
        ctx.strokeRect(36 * rpx, 36 * rpx, 648 * rpx, 648 * rpx);
        break;
      default:
        ctx.strokeRect(36 * rpx, 36 * rpx, 648 * rpx, 648 * rpx);
        break;
    }

  }

  else {
    throw new Error('ctx is null.');
  }
}

/**
 * 
 * @param {Object} ctx 画布（700*700rpx）
 * @param {Array} start 起点（单位rpx）
 * @param {Array} end 重点（单位rpx）
 * @param {Number} width 线段宽度（单位rpx）
 */
function drawLine(ctx, start, end, width) {

  if (!ctx) throw new Error('ctx is null');
  if (!checkPoint(start) || !checkPoint(end)) throw new Error('line ends is error');

  ctx.beginPath();

  // 设置线段样式
  ctx.setLineWidth(width * rpx);
  ctx.setLineCap('round');
  ctx.setLineJoin('round');
  ctx.setStrokeStyle('#ae7f53');

  // 绘制线段
  ctx.moveTo(start[0] * rpx, start[1] * rpx);
  ctx.lineTo(end[0] * rpx, end[1] * rpx);
  ctx.stroke();

}

/**
 * 
 * @param {Object} ctx 画布（700*700rpx）
 * @param {Array} center 圆心（单位rpx）
 * @param {Number} raduis 半径（单位rpx）
 * @param {String} color 填充色（支持rgb, rgba）
 */
// 绘制棋子或特殊点
function drawPoint(ctx, center, raduis, color) {

  // debugger;
  if (!ctx) throw new Error('ctx is null');
  if (!checkPoint(center)) throw new Error('circle center is error');

  ctx.beginPath();
  ctx.arc(center[0] * rpx, center[1] * rpx, raduis * rpx, 0, 2 * (Math.PI));
  ctx.setFillStyle(color);
  ctx.fill();
}

/**
 * 
 * @param {Object} ctx 画布（700*700rpx）
 * @param {String} size 尺寸（sm, md, lg）
 */
function drawChessboardGo(ctx, size) {
  $log('开始绘制棋盘', 'red', '2em')

  ctx.beginPath();// 开启绘制路径

  drawBox(ctx, size, 5)// 绘制棋盘边框

  // 绘制棋盘坐标线
  if (size == 'sm') {
    // * 19 * 19 棋盘
    for (let x = 144, y = 144; x <= 648; x += 72, y += 72) {
      drawLine(ctx, [x, 72], [x, 648], 1);
      drawLine(ctx, [72, y], [648, y], 1);
    }
  }

  else if (size == 'md') {
    // 13 * 13 棋盘
    for (let x = 105, y = 105; x <= 666; x += 51, y += 51) {
      drawLine(ctx, [x, 54], [x, 666], 1);
      drawLine(ctx, [54, y], [666, y], 1);
    }

    drawPoint(ctx, [207, 207], 6, '#ae7f53');
    drawPoint(ctx, [513, 207], 6, '#ae7f53');
    drawPoint(ctx, [360, 360], 6, '#ae7f53');
    drawPoint(ctx, [207, 513], 6, '#ae7f53');
    drawPoint(ctx, [513, 513], 6, '#ae7f53');
  }

  else if (size == 'lg') {
    // 9 * 9 棋盘
    for (let x = 72, y = 72; x <= 684; x += 36, y += 36) {
      drawLine(ctx, [x, 36], [x, 684], 1);
      drawLine(ctx, [36, y], [684, y], 1);
    }

    // 绘制特殊点（星以及天元）
    drawPoint(ctx, [144, 144], 6, '#ae7f53');
    drawPoint(ctx, [360, 144], 6, '#ae7f53');
    drawPoint(ctx, [576, 144], 6, '#ae7f53');
    drawPoint(ctx, [144, 360], 6, '#ae7f53');
    drawPoint(ctx, [144, 576], 6, '#ae7f53');
    drawPoint(ctx, [360, 360], 6, '#ae7f53');
    drawPoint(ctx, [360, 576], 6, '#ae7f53');
    drawPoint(ctx, [576, 360], 6, '#ae7f53');
    drawPoint(ctx, [576, 576], 6, '#ae7f53');
  }

  else {
    // 9 * 9 棋盘
    for (let x = 72, y = 72; x <= 684; x += 36, y += 36) {
      drawLine(ctx, [x, 36], [x, 684], 1);
      drawLine(ctx, [36, y], [684, y], 1);
    }
  }

  ctx.draw();// 开始绘制
  $log('棋盘绘制完毕', 'yellow', '2em')
}

/**
 * 
 * @param {Array} point 点位数组 [x, y] 
 * @returns 
 */
function computedPiecesPosition(position, size) {
  // debugger;
  // * 计算落子点位（相比张志凯的算法，我的无需进行【余数 和 间隔/2】的大小判定，也无需在余数大于 间隔/2 后给商加1）
  position.forEach((val, idx) => {
    // debugger;

    // * 计算坐标值有多少个【间隔/2】，偶数个则说明点位值绝对偏向上一个（左方或上方）点位。奇数个则说明点位值绝对偏向下一个（右方或下方）点位。
    let res = (size == 'md') ? Math.floor((val - 3) / halfGap[size]) : Math.floor(val / halfGap[size]);

    // 计算点位的值
    if (size == 'md') {
      position[idx] = (checkEvenOdd(res) == 'odd') ? (res * halfGap[size] + 28.5) : ((res - 1) * halfGap[size] + 28.5);
    }

    else {
      position[idx] = (checkEvenOdd(res) == 'odd') ? ((res + 1) * halfGap[size]) : (res * halfGap[size]);
    }
  })

  return position;
}

/**
 * 
 * @param {*} ctx 
 * @param {*} pieces 
 * @param {*} size 
 */
function drawPiecesGo(ctx, pieces, size) {
  pieces.forEach(point => {

    // debugger
    let { position, step } = point;

    // 点位值校验
    if (!checkPoint(position)) {
      throw new Error('point is error')
    }

    position = [Math.round((position[0] / rpx) - 15), Math.round((position[1] / rpx) - 15)];// 按 rpx 比例转换坐标值，减 15 是减去位移量

    // 判定点位是否超出棋盘落子判定区域
    let isOutside = position.some(val => {
      return (size == 'md') ? (val <= 28.5) || (val >= (720 - 28.5)) : (val <= halfGap[size]) || (val >= (720 - halfGap[size]));
    });

    // 判定点位是否刚好落在棋盘点位中间
    let isMidPoint = position.some(val => {
      // debugger;
      return (size == 'md') ? ((val - 28.5) % halfGap['md'] === 0) : (val % halfGap[size] === 0);
    })

    if (isOutside || isMidPoint) return;// 不符合的落子点位不执行后续程序

    // 计算落子点位值
    position = computedPiecesPosition(position, size);

    $log(`当前落子点位 ${position}`, 'pink', '2em')

    // 绘制棋子
    let color = (checkEvenOdd(step) == 'odd') ? 'black' : 'white';// 奇步数为黑手，偶步数为白手
    let raduis = halfGap[size] - 2;// 依据间隔设定棋子半径
    drawPoint(ctx, position, raduis, color);
  });

  ctx.draw();
}

// todo 绘制文字

// todo 绘制图片背景

// todo 绘制渐变色背景

// * helper func
function checkPoint(arr) {
  // debugger;
  let isNum = arr.every(num => {
    return Object.prototype.toString.call(num) == '[object Number]';
  });

  if (!Array.isArray(arr) || (arr.length != 2) || !isNum) {
    return false;
  }

  else {
    return true;
  }
}

export { drawChessboardGo, drawPiecesGo, halfGap };

