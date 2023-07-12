<template>
  <!-- 棋盘 -->
  <view class="content w-full relative" style="height: 750rpx; padding: 15rpx;">
    <canvas style="width: 720rpx; height: 720rpx;" class="box-shadow-main rounded-md chessboard-bg"
      canvas-id="chessboard-go" />
    <canvas style="width: 720rpx; height: 720rpx; top: 15rpx;" class="rounded-md absolute bg-none" canvas-id="pieces-go"
      @touchstart="onChessboardTouch" />
  </view>
  <view class=" w-56 text-xs yulin-button-main" @tap="onGhostSelection">
    落子
  </view>
  <view>上一步</view>
</template>

<script>
import globalState from "@/mixins/globalState.js";
import { checkDuplicates, checkSelectionArea, getCalibrationPosition } from "./calculatePoint.js";
import { drawChessboard, drawPieces } from "./drawChessboard.js";
export default {
  setup() {
    const points_paly = ref([]);// 对战落子点位
    let curHandsCountNum = ref(0);// 最新手数

    return {
      curHandsCountNum,
      points_paly
    }
  },

  props: {
    // 棋盘模式 paly(对战模式) record(记录模式，记录机械臂数据)
    model: {
      type: String,
      default: 'play'
    },
    // 棋盘规格
    size: {
      type: String,
      default: 'lg'
    },
    // 组件接收的点位数据
    inputPoints: {
      type: Array,
      default: []
    },
    // 启用手数
    handsCount: {
      type: Boolean,
      default: true
    },
    // 启用试下
    tryPlay: {
      type: Boolean,
      default: true
    },
  },

  computed: {
    // 对战复盘记录数据
    points_record() {
      // todo 转换成rpx比例坐标
      return this.inputPoints
    }
  },

  watch: {
    points(cur, pre) {
      console.log('测试', pre)
    }
  },

  methods: {
    // 
    onChessboardTouch(e) {
      // debugger;
      if (this.model == 'record') return;// 检查模式

      const ctx = uni.createCanvasContext('pieces-go');
      let touchPoint = [e.touches[0].x, e.touches[0].y];

      // 按 rpx单位 比例转换 px单位 坐标值，减 15 是减去棋盘位移量
      let position_rpx = [Math.round((touchPoint[0] / globalState.rpx) - 15), Math.round((touchPoint[1] / globalState.rpx) - 15)];
      if (checkSelectionArea(position_rpx, this.size) == 'no') return;// 校验点位是否在可落点区域

      position_rpx = getCalibrationPosition(position_rpx, this.size);// 获取校准后的正确点位数据
      if (checkDuplicates(this.points_paly, position_rpx)) return;// 点位查重

      this.addPoint(position_rpx);// 添加落子点位

      drawPieces(ctx, this.points_paly, this.size, this.handsCount, this.curHandsCountNum);
    },
    
    // 添加落子点位
    addPoint(position_rpx) {
      // 试下模式启用时
      if (this.tryPlay) {
        let hasGhost = (this.points_paly.length > 0) ? (this.points_paly.at(-1).handsCountNum === -1) : false;// 是否有未落子幽灵棋
        hasGhost && this.points_paly.pop();// 先删除原来的幽灵棋子

        // 再添加新位置的幽灵棋子
        this.points_paly.push({
          handsCountNum: -1,// -1 表示幽灵棋子。
          position: position_rpx
        });
      }
      // 试下模式关闭时
      else {
        this.curHandsCountNum += 1;
        this.points_paly.push({
          handsCountNum: this.curHandsCountNum,// 吃子功能需要步数的缓存。
          position: position_rpx
        });
      }

    },
    
    // 试下棋子落子
    onGhostSelection() {
      if (this.model != 'play') return;
      if (this.points_paly.length < 1) return;
      if (this.points_paly.at(-1).handsCountNum != -1) return;

      const ctx = uni.createCanvasContext('pieces-go');
      this.points_paly.at(-1).handsCountNum = this.curHandsCountNum += 1;

      drawPieces(ctx, this.points_paly, this.size, this.handsCount, this.curHandsCountNum);
    },

    // 吃子

    // 悔棋
  },

  mounted(e) {
    const ctx = uni.createCanvasContext('chessboard-go');
    drawChessboard(ctx, this.size);
  }
}

</script>

<style lang="scss">
.chessboard-bg {
  background: linear-gradient(to bottom, $v-chess-bg-light, $v-chess-bg);
}
</style>
