import globalState from "@/mixins/globalState.js";

const rpx = globalState.rpx;
const halfGaps = {
  '9X9': 36,
  '13X13': 25.5,
  '15X15': 22.5,
  '19X19': 18,
}
const allStars = {
  '9X9': [],
  '13X13': [{ x: 207, y: 207 }, { x: 513, y: 207 }, { x: 360, y: 360 }, { x: 207, y: 513 }, { x: 513, y: 513 }],
  '15X15': [
    { x: 180, y: 180 },
    { x: 540, y: 540 },
    { x: 360, y: 360 },
    { x: 180, y: 540 },
    { x: 540, y: 180 }
  ],
  '19X19': [
    { x: 144, y: 144 },
    { x: 360, y: 144 },
    { x: 576, y: 144 },
    { x: 144, y: 360 },
    { x: 144, y: 576 },
    { x: 360, y: 360 },
    { x: 360, y: 576 },
    { x: 576, y: 360 },
    { x: 576, y: 576 },
  ]
}
const borderSizes = {
  '9X9': {
    x: 72,
    y: 72,
    width: 576
  },
  '13X13': {
    x: 54,
    y: 54,
    width: 612
  },
  '15X15': {
    x: 45,
    y: 45,
    width: 630
  },
  '19X19': {
    x: 36,
    y: 36,
    width: 648
  },
}
const piecesColors = {
  black: ['rgb(165, 165, 165)', 'rgb(0, 0, 0)'],
  white: ['rgb(255, 255, 255)', 'rgb(165, 165, 165)'],
  transBlack: ['rgba(165, 165, 165, 0.7)', 'rgba(0, 0, 0, 0.7)'],
  transWhite: ['rgba(255, 255, 255, 0.7)', 'rgba(165, 165, 165, 0.7)']
}

class ChessborderDrawer {
  /**
   * @param {Object} ctx_chessboader 棋盘画布图层
   * @param {Object} ctx_pieces 棋子画布图层
   * @param {String} size 棋盘尺寸
   */
  constructor(ctx_chessboader, ctx_pieces, size = '19X19') {
    ChessborderDrawer.checkCanvasContext(ctx_chessboader);
    ChessborderDrawer.checkCanvasContext(ctx_pieces);

    this.ctx_chessboader = ctx_chessboader;
    this.ctx_pieces = ctx_pieces;
    this.size = size;

    this._stars = allStars[size];// 星位和天元
    this._halfGap = halfGaps[size];// 半间距
    this._borderSize = borderSizes[size];// 边框尺寸
  }

  _handsCount = true;// 启用手数
  _curHandsPoints = [];// 当前回合（手）点位数据

  #borderWidth = 5 * rpx;
  #lineWidth = 1 * rpx;
  #lineGapStyle = 'round';// 线段端点样式
  #lineJoinStyle = 'round';// 线段交点样式
  #lineColor = '#ae7f53';// 网格线颜色

  drawChessboard() {
    this.#drawRect(this.ctx_chessboader, this._borderSize.x, this._borderSize.y, this._borderSize.width);// 绘制棋盘边框

    // 绘制棋盘网格线
    switch (this.size) {
      case '9X9':
        for (let x = 144, y = 144; x < 648; x += 72, y += 72) {
          this.#drawLine(this.ctx_chessboader, { x, y: 72 }, { x, y: 648 });
          this.#drawLine(this.ctx_chessboader, { x: 72, y }, { x: 648, y });
        }
        break;
      case '13X13':
        for (let x = 105, y = 105; x < 666; x += 51, y += 51) {
          this.#drawLine(this.ctx_chessboader, { x, y: 54 }, { x, y: 666 });
          this.#drawLine(this.ctx_chessboader, { x: 54, y }, { x: 666, y });
        }
        break;
      case '15X15':
        for (let x = 90, y = 90; x < 675; x += 45, y += 45) {
          this.#drawLine(this.ctx_chessboader, { x, y: 45 }, { x, y: 675 });
          this.#drawLine(this.ctx_chessboader, { x: 45, y }, { x: 675, y });
        }
        break;
      case '19X19':
        for (let x = 72, y = 72; x < 684; x += 36, y += 36) {
          this.#drawLine(this.ctx_chessboader, { x, y: 36 }, { x, y: 684 });
          this.#drawLine(this.ctx_chessboader, { x: 36, y }, { x: 684, y });
        }
        break;
    }

    // 绘制星位和天元
    this._stars.forEach(star => {
      this.#drawPoint(this.ctx_chessboader, star, 6, this.#lineColor);
    })

    this.ctx_chessboader.draw();
  }
  drawPieces() {
    this._curHandsPoints.forEach((pit, idx, arr) => {
      const { position, color, handsNum } = pit;

      let grdStart = { x: position.x - this._halfGap, y: position.y - this._halfGap }
      let grdEnd = { x: position.x + this._halfGap, y: position.y + this._halfGap }
      let fillColor = piecesColors[color];
      const grdColor = this.#setFillGrdColor(this.ctx_pieces, grdStart, grdEnd, fillColor);
      this.#drawPoint(this.ctx_pieces, position, this._halfGap - 2, grdColor);

      let len = arr.length;

      // 绘制手数
      if (this._handsCount) {
        // 试下
        if (handsNum === -1 && len > 1) {
          let trueLastPoint = arr[len - 2];
          let { position, handsNum, color } = trueLastPoint;
          let fontColor = color == 'black' ? 'white' : 'black';
          this.#drawText(this.ctx_pieces, position.x, position.y + this._halfGap / 3, handsNum, fontColor)
        }
        // 非试下
        else if (idx === (len - 1)) {
          let fontColor = color == 'black' ? 'white' : 'black';
          this.#drawText(this.ctx_pieces, position.x, position.y + this._halfGap / 3, handsNum, fontColor);
        }
      }

      // 绘制指示器
      // 试下
      if (handsNum === -1 && len > 1) {
        let trueLastPoint = arr[len - 2];
        let { position } = trueLastPoint;
        this.#drawCircle(this.ctx_pieces, position, this._halfGap, 3, 'red')
      }
      // 非试下
      else if (idx === (len - 1)) {
        this.#drawCircle(this.ctx_pieces, position, this._halfGap, 3, 'red');
      }
    })

    this.ctx_pieces.draw();
  }

  // getcurHandsPoints() { }
  setcurHandsPoints(points) {
    ChessborderDrawer.checkPoints(points)
    this._curHandsPoints = points;
  }
  setHandsCount(state) {
    if (Object.prototype.toString.call(state) != '[object Boolean]') return;
    this._handsCount = state;
  }

  /**
   * 绘制方框
   * @param {Object} ctx 
   * @param {Number} x 
   * @param {Number} y 
   * @param {String} width 
   */
  #drawRect(ctx, x, y, width) {
    ctx.beginPath();

    ctx.setLineWidth(this.#borderWidth);
    ctx.setLineJoin(this.#lineGapStyle);
    ctx.setStrokeStyle(this.#lineColor);

    ctx.strokeRect(x * rpx, y * rpx, width * rpx, width * rpx);
  }
  /**
   * 绘制线段
   * @param {Object} ctx 
   * @param {Object} start 
   * @param {Object} end 
   */
  #drawLine(ctx, start, end) {
    ctx.beginPath();

    ctx.setLineWidth(this.#lineWidth);
    ctx.setLineCap(this.#lineGapStyle);
    ctx.setLineJoin(this.#lineJoinStyle);
    ctx.setStrokeStyle(this.#lineColor);

    ctx.moveTo(start.x * rpx, start.y * rpx);
    ctx.lineTo(end.x * rpx, end.y * rpx);
    ctx.stroke();
  }
  /**
   * 绘制线段
   * @param {Object} ctx 
   * @param {Object} center 
   * @param {Number} raduis 
   * @param {String || Object} fillColor 
   */
  #drawPoint(ctx, center, raduis, fillColor) {
    ctx.beginPath();

    ctx.arc(center.x * rpx, center.y * rpx, raduis * rpx, 0, 2 * (Math.PI));
    ctx.setFillStyle(fillColor);
    ctx.fill();
  }
  /**
   * 绘制文本
   * @param {Object} ctx 
   * @param {Number} x 
   * @param {Number} y 
   * @param {String} text 
   * @param {String} fontColor 
   */
  #drawText(ctx, x, y, text, fontColor) {
    ctx.beginPath();

    ctx.setFillStyle(fontColor);
    ctx.setTextAlign('center');
    ctx.setFontSize(this._halfGap * rpx);

    ctx.fillText(text, x * rpx, y * rpx);
  }
  /**
   * 绘制圆形
   * @param {Object} ctx 
   * @param {Object} center 
   * @param {Number} raduis 
   * @param {Number} width 
   * @param {String} color 
   */
  #drawCircle(ctx, center, raduis, width, color) {
    ctx.beginPath();

    ctx.arc(center.x * rpx, center.y * rpx, raduis * rpx, 0, 2 * (Math.PI));
    ctx.setLineWidth(width * rpx);
    ctx.setStrokeStyle(color);
    ctx.stroke();
  }
  /**
   * 设置填充渐变色
   * @param {Object} ctx 
   * @param {Object} grdStart 
   * @param {Object} grdEnd 
   * @param {Object} grdColor 
   * @returns 
   */
  #setFillGrdColor(ctx, grdStart, grdEnd, grdColor) {
    let grd = ctx.createLinearGradient(grdStart.x * rpx, grdStart.y * rpx, grdEnd.x * rpx, grdEnd.y * rpx);
    grd.addColorStop(0, grdColor[0]);
    grd.addColorStop(1, grdColor[1]);

    return grd;
  }

  static checkCanvasContext(ctx) {
    const ctxProto = Object.getPrototypeOf(ctx);

    if (!ctxProto.draw) {
      throw new Error('ctx is not a CanvansContext object.');
    }
  }
  static checkPoints(points) {
    if (Object.prototype.toString.call(points) != '[object Array]') {
      throw new Error('points is not a Array.')
    }

    points.forEach((pit, idx) => {
      if (!pit.position?.x || !pit.position?.y || !pit.color || !pit.handsNum) {
        throw new Error(`The element ${idx} of points is error.`)
      }
    })
  }
}

export default ChessborderDrawer;
