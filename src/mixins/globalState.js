import { reactive } from 'vue';

const globalState = reactive({
  canUseHeight: uni.getStorageSync('sysInfo').canUseHeight,
  rpx: (uni.getStorageSync('sysInfo').screenWidth) / 750
})

export default globalState;
