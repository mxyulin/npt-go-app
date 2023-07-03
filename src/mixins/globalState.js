import { reactive } from 'vue';

const globalState = reactive({
  canUseHeight: uni.getStorageSync('sysInfo').canUseHeight
})

export default globalState;
