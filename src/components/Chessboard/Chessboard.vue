<template>
  <!-- 棋盘 -->
  <view class="content w-full relative" style="height: 750rpx; padding: 15rpx;">
    <canvas style="width: 720rpx; height: 720rpx;" class="box-shadow-main rounded-md chessboard-bg"
      canvas-id="canvas-chessboard" />
    <canvas style="width: 720rpx; height: 720rpx; top: 15rpx;" class="rounded-md absolute bg-none"
      canvas-id="canvas-pieces" @touchstart="_onTouch" />
  </view>
</template>

<script>
import globalState from "@/mixins/globalState.js";
import { checkDuplicates, checkSelection, getDesiredPos_touch } from './chessboader_core';
import ChessborderDrawer from './chessboader_drawer';

const rpx = globalState.rpx;

export default {
  setup() {
    let HandsCountTotal = ref(0);// 当前手数
    const chessboader = reactive({});

    const points_game = ref([]);// 当前对局落点数据
    const points_ban = ref([{ position: [360, 360] }]);// 当前对局禁用落点数据


    return {
      HandsCountTotal,
      points_game,
      points_ban,
      chessboader
    }
  },

  props: {
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
      default: '19X19'
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
    }
  },

  watch: {
    points(cur, pre) {
      console.log('测试', pre)
    }
  },

  methods: {
    // 玩家落子
    _onTouch(e) {
      // debugger;
      if (!this.tryPlay) return;

      let touchPos_rpx = { x: Math.round((e.touches[0].x / rpx) - 15), y: Math.round((e.touches[0].y / rpx) - 15) };
      if (!checkSelection(touchPos_rpx, this.size)) return;

      let desiredPos = getDesiredPos_touch(touchPos_rpx, this.size);
      if (checkDuplicates(this.points_game, desiredPos)) return;// 点位查重
      // if (checkDuplicates(this.points_ban, position_rpx)) return useShowMessage('无气点位，禁止落子~');// 禁用点检查

      // this._addPoint(position_rpx);// 添加落子点位

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

    // 试下棋子落子
    onGhostSelection() {
      if (this.tryPlay) return;

      let len = this.points_game.length;
      if (len < 1) return;
      if (this.points_game[len - 1].handsCountNum != -1) return;

      const ctx = uni.createCanvasContext('canvas-pieces');
      this.points_game[len - 1].handsCountNum = this.HandsCountTotal += 1;

      // todo 添加对局快照

    },
  },

  mounted(e) {
    const ctx_chessBoader = uni.createCanvasContext('canvas-chessboard');
    const ctx_pieces = uni.createCanvasContext('canvas-pieces');
    this.chessboader = new ChessborderDrawer(ctx_chessBoader, ctx_pieces, this.size);
    this.chessboader.drawChessboard();
    this.chessboader.setcurHandsPoints([{
      position: {
        x: 72,
        y: 72
      },
      color: 'white',
      handsNum: 1
    }, {
      position: {
        x: 72,
        y: 144
      },
      color: 'black',
      handsNum: 2
    }]);
    // this.chessboader.drawPieces();
    console.log('测试', this.chessboader)
  }
}
</script>

<style lang="scss">
.chessboard-bg {
  background: linear-gradient(to bottom, $v-chess-bg-light, $v-chess-bg);
}
</style>
