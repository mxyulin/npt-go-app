<script>

export default {
  setup: function () {
    console.log('Vue3 setup')
  },
  onLaunch: function () {
    uni.getSystemInfo({
      success: (res) => {
        // debugger;
        let sysInfo = res;
        let canUseHeight = sysInfo.windowHeight - 44 + 'px';
        sysInfo.canUseHeight = canUseHeight;
        uni.setStorageSync('sysInfo', sysInfo);
      }
    })
    console.log('App Launch',)
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
@import "@/static/styles/theme.scss";// 主题变量
</style>
