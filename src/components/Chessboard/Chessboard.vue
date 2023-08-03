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
import { checkSelection, getDesiredPos_touch } from './chessboader_core';
import ChessborderDrawer from './chessboader_drawer';

const rpx = globalState.rpx;

export default {
  setup() {
    const chessboader = reactive({});

    return {
      chessboader
    }
  },

  props: {
    // 棋盘规格尺寸
    size: {
      type: String,
      default: '19X19'
    },
    // 落子点位数据
    points: {
      type: Array,
      default: []
    },
    // 启用手数（默认启动）
    handsCount: {
      type: Boolean,
      default: true
    },
    // 启用试下
    tryPlay: {
      type: Boolean,
      default: false
    }
  },

  computed: {
  },

  watch: {
    points: {
      immediate: false,
      deep: true,
      handler(cur, pre) {
        this.chessboader.setPoints(cur);
        this.chessboader.drawPieces();
      }
    },
    handsCount(cur, pre) {
      this.chessboader.setHandsCount(cur);
      this.chessboader.drawPieces();
    }
  },

  methods: {
    _onTouch(e) {
      if (!this.tryPlay) return;

      let touchPos_rpx = { x: Math.round((e.touches[0].x / rpx) - 15), y: Math.round((e.touches[0].y / rpx) - 15) };
      if (!checkSelection(touchPos_rpx, this.size)) return;

      let desiredPos = getDesiredPos_touch(touchPos_rpx, this.size);
      this.$emit('onTouch', desiredPos);
    },
  },

  mounted(e) {
    const ctx_chessBoader = uni.createCanvasContext('canvas-chessboard');
    const ctx_pieces = uni.createCanvasContext('canvas-pieces');
    this.chessboader = new ChessborderDrawer(ctx_chessBoader, ctx_pieces, this.size, this.handsCount);
    this.chessboader.drawChessboard();
    this.chessboader.setPoints(this.points);
    this.chessboader.drawPieces();
  }
}
</script>

<style lang="scss">
.chessboard-bg {
  background: linear-gradient(to bottom, $v-chess-bg-light, $v-chess-bg);
}
</style>
