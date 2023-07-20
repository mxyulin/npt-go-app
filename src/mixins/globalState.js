import { reactive } from 'vue';

const globalState = reactive({
  canUseHeight: uni.getStorageSync('sysInfo').canUseHeight,
  rpx: (uni.getStorageSync('sysInfo').screenWidth) / 750,
  themeColor: '#2abfa5'
})

export default globalState;
