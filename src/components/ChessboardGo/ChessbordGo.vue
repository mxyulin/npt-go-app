<template>
  <!-- 棋盘 -->
  <view class="content w-full relative" style="height: 750rpx; padding: 15rpx;">
    <canvas style="width: 720rpx; height: 720rpx;" class="box-shadow-main rounded-md chessboard-bg"
      canvas-id="chessboard-go" />
    <canvas style="width: 720rpx; height: 720rpx; top: 15rpx;" class="rounded-md absolute bg-none" canvas-id="pieces-go"
      @touchstart="_onChessboardTouch" />
  </view>
</template>

<script>
import globalState from "@/mixins/globalState.js";
import { useShowMessage } from "@/mixins/methods.js";
import { checkDuplicates, checkSelectionArea, getCalibrationPosition } from "./calculatePoint.js";
import { drawChessboard, drawPieces } from "./drawChessboard.js";
export default {
  setup() {
    let HandsCountTotal = ref(0);// 当前手数

    let snapshots_game = ref([]);// 对战快照
    const points_game = ref([]);// 当前对局落点数据
    const points_ban = ref([{ position: [360, 360] }]);// 当前对局禁用落点数据



    return {
      HandsCountTotal,
      snapshots_game,
      points_game,
      points_ban
    }
  },

  props: {
    // 棋盘模式 paly(对战模式) record(记录模式，记录机械臂数据)
    model: {
      type: String,
      default: 'play'
    },
    // 
    currentColor: {
      type: String,
      default: 'black'
    },
    // 玩家黑先还是白后
    playerColor: {
      type: String,
      default: 'black'
    },
    // 棋盘规格
    size: {
      type: String,
      default: 'lg'
    },
    // 组件接收的点位数据
    snapshots: {
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
    points_history() {
      /**
       * todo 转换成rpx比例坐标
      */
      return this.snapshots
    },

    // 总手数就是快照总数
    HandsCountTotal() {
      return this.snapshots_game.length;
    }
  },

  watch: {
    points(cur, pre) {
      console.log('测试', pre)
    }
  },

  methods: {
    // 玩家落子
    _onChessboardTouch(e) {
      // debugger;
      if (this.model == 'record') return;// 非对战模式玩家不可落子
      if (this.currentColor != this.playerColor) return;// 非玩家回合玩家不可落子

      const ctx = uni.createCanvasContext('pieces-go');
      let touchPoint = [e.touches[0].x, e.touches[0].y];

      // 按 rpx单位 比例转换 px单位 坐标值，减 15 是减去棋盘位移量
      let position_rpx = [Math.round((touchPoint[0] / globalState.rpx) - 15), Math.round((touchPoint[1] / globalState.rpx) - 15)];
      if (checkSelectionArea(position_rpx, this.size) == 'no') return;// 校验点位是否在可落点区域

      position_rpx = getCalibrationPosition(position_rpx, this.size);// 获取校准后的正确点位数据
      if (checkDuplicates(this.points_game, position_rpx)) return;// 点位查重
      if (checkDuplicates(this.points_ban, position_rpx)) return useShowMessage('无气点位，禁止落子~');// 禁用点检查

      this._addPoint(position_rpx);// 添加落子点位

      drawPieces(ctx, this.points_game, this.size, this.handsCount, this.HandsCountTotal);
    },

    // 添加落子点位
    _addPoint(position_rpx) {
      // 试下模式启用时
      if (this.tryPlay) {
        let len = this.points_game.length;
        let hasGhost = (this.points_game.length > 0) ? (this.points_game[len - 1].handsCountNum === -1) : false;// 是否有未落子幽灵棋
        hasGhost && this.points_game.pop();// 先删除原来的幽灵棋子

        // 再添加新位置的幽灵棋子
        this.points_game.push({
          color: this.currentColor,
          position: position_rpx,
          handsCountNum: -1,// -1 表示幽灵棋子
        });
      }
      // 试下模式关闭时
      else {
        this.HandsCountTotal += 1;
        this.points_game.push({
          color: this.currentColor,
          position: position_rpx,
          handsCountNum: this.HandsCountTotal,
        });

        // todo 添加对局快照
      }
    },

    ////删除落子点位
    _delPoint(strat, length) {

    },

    // 添加游戏快照
    _addSnapshots(color, handsNum, position_rpx) {
      this.snapshots_game.push({
        selectionColor: color,
        handsNum,
        points: [...this.points_game, { position_rpx }]
      })
    },

    // 删除手数快照
    _delSnapshots(shot) {
    },

    // 试下棋子落子
    onGhostSelection() {
      if (this.model != 'play') return;

      let len = this.points_game.length;
      if (len < 1) return;
      if (this.points_game[len - 1].handsCountNum != -1) return;

      const ctx = uni.createCanvasContext('pieces-go');
      this.points_game[len - 1].handsCountNum = this.HandsCountTotal += 1;

      // todo 添加对局快照

      drawPieces(ctx, this.points_game, this.size, this.handsCount, this.HandsCountTotal);
    },

    /**
     * todo 悔棋（待完善逻辑）
     */
    takeBack() {
      if (this.model != 'play') return;

      let len = this.points_game.length;
      if (this.points_game[len - 1].handsCountNum === -1) return useShowMessage('试下中，无法悔棋~');
      if (len === 0) return useShowMessage('无法悔棋，请开始游戏~');
      if (len === 1) return useShowMessage('无法悔棋，请等待对手回合结束~');

      this.HandsCountTotal -= 2;// 手数减2
      this.points_game.splice(-2, 2);// 删除最后两个棋子数据

      const ctx = uni.createCanvasContext('pieces-go');
      drawPieces(ctx, this.points_game, this.size, this.handsCount, this.HandsCountTotal);
    },

    // 
    takeBackToLast() {
      uni.showModal({
        title: '我要悔棋',
        cancelText: '算了',
        confirmText: '没错',
        success: (e) => {
          if (e.confirm) {
            this.takeBack();
          }
        }
      })
    },
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
