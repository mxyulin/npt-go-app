import globalState from "@/mixins/globalState.js";
import { checkEvenOdd } from "@/utils/tools";

let rpx = globalState.rpx;
// 不同棋盘的一半间隔宽
let halfGap = {
  sm: 36,
  md: 25.5,
  lg: 18
}

/**
 * 绘制边框
 * @param {Object} ctx 画布（700*700rpx）
 * @param {String} size 棋盘尺寸（围棋）：大（19*19），中（），小（）
 * @param {Number} width 边框宽度（单位rpx）
 */
function drawBox(ctx, size, width) {
  ctx.beginPath();

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
      ctx.strokeRect(72 * rpx, 72 * rpx, 576 * rpx, 576 * rpx);
      break;
  }
}

/**
 * 绘制棋盘线
 * @param {Object} ctx 画布（700*700rpx）
 * @param {Array} start 起点（单位rpx）
 * @param {Array} end 重点（单位rpx）
 * @param {Number} width 线段宽度（单位rpx）
 */
function drawLine(ctx, start, end, width) {
  if (!checkPoint(start) || !checkPoint(end)) {
    throw new Error('Point is not correct --- drawLine');
  };

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
 * 绘制棋子或特殊点
 * @param {Object} ctx 画布（700*700rpx）
 * @param {Array} center 圆心（单位rpx）
 * @param {Number} raduis 半径（单位rpx）
 * @param {String} color 填充色（支持rgb, rgba）
 */
function drawPoint(ctx, center, raduis, color) {
  if (!checkPoint(center)) throw new Error('Point is not correct --- drawPoint');

  ctx.beginPath();
  ctx.arc(center[0] * rpx, center[1] * rpx, raduis * rpx, 0, 2 * (Math.PI));
  ctx.setFillStyle(color);
  ctx.fill();
}

/**
 * 绘制棋盘
 * @param {Object} ctx 画布（700*700rpx）
 * @param {String} size 尺寸（sm, md, lg）
 */
function drawChessboard(ctx, size) {
  $clog('开始绘制棋盘', 'red', '2em');

  ctx.beginPath();// 开启绘制路径

  drawBox(ctx, size, 5);// 绘制棋盘边框

  // 绘制棋盘坐标线
  if (size == 'sm') {
    //* 9x9 棋盘
    for (let x = 144, y = 144; x <= 648; x += 72, y += 72) {
      drawLine(ctx, [x, 72], [x, 648], 1);
      drawLine(ctx, [72, y], [648, y], 1);
    }
  }

  else if (size == 'md') {
    //* 13x13 棋盘
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
    //* 19x19 棋盘
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
    // * 9x9 棋盘
    for (let x = 144, y = 144; x <= 648; x += 72, y += 72) {
      drawLine(ctx, [x, 72], [x, 648], 1);
      drawLine(ctx, [72, y], [648, y], 1);
    }
  }

  ctx.draw();// 开始绘制
  $clog('棋盘绘制完毕', 'yellow', '2em')
}

/**
 * 绘制围棋棋子
 * @param {*} ctx 
 * @param {*} points
 * @param {*} size 
 */
function drawPieces(ctx, points, size, isHandsCount, curHandsCountNum) {
  points.forEach((point, idx, points) => {
    let { position, handsCountNum } = point;

    ctx.beginPath();

    // 添加拟真棋子样式
    let gradientStart = { x: position[0] * rpx - halfGap[size] * rpx, y: position[1] * rpx - halfGap[size] * rpx };// 渐变起始点
    let gradientEnd = { x: position[0] * rpx + halfGap[size] * rpx, y: position[1] * rpx + halfGap[size] * rpx };// 渐变结束点
    const grd = setFillColor(gradientStart, gradientEnd, handsCountNum, curHandsCountNum);

    // 绘制棋子
    ctx.setFillStyle(grd);
    ctx.arc(position[0] * rpx, position[1] * rpx, ((halfGap[size] - 2) * rpx), 0, 2 * (Math.PI));
    ctx.fill();

    // 绘制指示器（和手数）
    let fontColor = (checkEvenOdd(curHandsCountNum) == 'odd') ? 'white' : 'black';// 手数文字和棋子颜色相反
    // 绘制指示器 --- 非试下
    if (handsCountNum === (points.length) && isHandsCount) {
      let curPoint = {
        x: position[0] * rpx,
        y: position[1] * rpx
      };
      drawNumIndicator(handsCountNum, curPoint, fontColor);
    }

    // 绘制指示器 --- 试下
    if (handsCountNum === -1 && points.length > 1 && isHandsCount) {
      // 倒数第二个是非幽灵棋子
      let lastPoint = {
        x: [...points].at(-2).position[0] * rpx,
        y: [...points].at(-2).position[1] * rpx
      };
      drawNumIndicator([...points].at(-2).handsCountNum, lastPoint, fontColor);
    }
  });

  $clog(`当前落子：${points.at(-1) ? points.at(-1).position : '空'}`, 'pink', '2em');
  ctx.draw();

  //* helper func --- 手数指示器
  function drawNumIndicator(isHandsCount, endStepPoint, fontColor) {
    // 绘制最后手数
    ctx.beginPath();
    ctx.setFillStyle(fontColor);
    ctx.setTextAlign('center');
    ctx.setFontSize(halfGap[size] * rpx);
    ctx.fillText(isHandsCount, endStepPoint.x, endStepPoint.y + (halfGap[size] / 2 - 3) * rpx);

    // 绘制指示器
    ctx.beginPath();
    ctx.setStrokeStyle('red');
    ctx.setLineWidth(3 * rpx);
    ctx.arc(endStepPoint.x, endStepPoint.y, halfGap[size] * rpx, 0, 2 * (Math.PI));
    ctx.stroke();
  }

  //* helper func --- 棋子填充样式
  function setFillColor(gradientStart, gradientEnd, handsCountNum, curHandsCountNum) {
    let grd = null;
    // 普通黑棋
    if (checkEvenOdd(handsCountNum) == 'odd' && handsCountNum > 0) {
      grd = ctx.createLinearGradient(gradientStart.x, gradientStart.y, gradientEnd.x, gradientEnd.y);
      grd.addColorStop(0, "rgb(165, 165, 165)");
      grd.addColorStop(1, "rgb(0, 0, 0)");
    }
    // 普通白棋
    else if (checkEvenOdd(handsCountNum) != 'odd' && handsCountNum > 0) {
      grd = ctx.createLinearGradient(gradientEnd.x, gradientEnd.y, gradientStart.x, gradientStart.y);
      grd.addColorStop(0, "rgb(165, 165, 165)");
      grd.addColorStop(1, "rgb(255, 255, 255)");
    }
    // 幽灵白棋
    else if (handsCountNum == -1 && checkEvenOdd(curHandsCountNum) == 'odd') {
      grd = ctx.createLinearGradient(gradientEnd.x, gradientEnd.y, gradientStart.x, gradientStart.y);
      grd.addColorStop(0, "rgba(165, 165, 165, 0.7)");
      grd.addColorStop(1, "rgba(255, 255, 255, 0.7)");
    }
    // 幽灵黑棋
    else if (handsCountNum == -1 && checkEvenOdd(curHandsCountNum) != 'odd') {
      grd = ctx.createLinearGradient(gradientStart.x, gradientStart.y, gradientEnd.x, gradientEnd.y);
      grd.addColorStop(0, "rgba(165, 165, 165, 0.7)");
      grd.addColorStop(1, "rgba(0, 0, 0, 0.7)");
    }

    return grd;
  }
}

//* helper func --- 点位校验 
function checkPoint(point) {
  let isNum = point.every(num => {
    return Object.prototype.toString.call(num) == '[object Number]';
  });

  if (!Array.isArray(point) || (point.length != 2) || !isNum) {
    return false;
  }

  return true;
}

export { drawChessboard, drawPieces };

