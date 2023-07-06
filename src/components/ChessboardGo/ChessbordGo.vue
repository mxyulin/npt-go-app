<template>
  <view class="content w-full relative" style="height: 750rpx; padding: 15rpx;">
    <canvas style="width: 720rpx; height: 720rpx;" class="box-shadow-main rounded-md chessboard-bg"
      canvas-id="chessboard-go" @tap="onTap" />
    <canvas style="width: 720rpx; height: 720rpx; top: 15rpx;" class="rounded-md absolute bg-none" canvas-id="pieces-go"
      @tap="onTap" />
  </view>
  <!-- <view class=" mt-3 flex justify-center items-center">
    <radio-group @change="onChange">
      <label class=" font-bold text-lg">
        <radio value="sm" :checked="true" />
        9 * 9
      </label>
      <label class=" font-bold text-lg">
        <radio value="md" :checked="false" />
        13 * 13
      </label>
      <label class=" font-bold text-lg">
        <radio value="lg" :checked="false" />
        19 * 19
      </label>
    </radio-group>
  </view> -->
</template>

<script>
import { ref } from 'vue';
import { drawChessboardGo, drawPiecesGo } from "./drawChessboard-go.js";

export default {
  setup() {
    const size = ref('lg');
    const pieces = ref([]);

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      size,
      pieces
    }
  },
  onReady(e) {
    const ctx = uni.createCanvasContext('chessboard-go');
    drawChessboardGo(ctx, this.size);
  },
  methods: {
    onTap(e) {
      // debugger;
      const ctx = uni.createCanvasContext('pieces-go');
      let center = [e.detail.x, e.detail.y];

      this.pieces.push({
        step: this.pieces.length + 1,
        position: center
      })

      drawPiecesGo(ctx, this.pieces, this.size)
    },

  }
}

</script>

<style lang="scss">
.chessboard-bg {
  background: linear-gradient(to bottom, $v-chess-bg-light, $v-chess-bg);
}
</style>
