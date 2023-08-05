import { unref } from 'vue';

function useShowMessage(msg) {
  let title = unref(msg);

  uni.showToast({
    title,
    icon: 'none',
    mask: false,
    duration: 3000
  })
}

function useJumpTo(route, msg) {
  // debugger;
  let url = unref(route);

  uni.navigateTo({
    url,
    // #ifdef APP-PLUS
    animationType: 'pop-in',
    // #endif
    success: () => {
      msg && useShowMessage(msg);
    }
  })
}

async function useShowLoading(msg, timing = 1000) {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: msg,
      mask: true,
      success: () => {
        let timer = setTimeout(() => {
          resolve('ok');
          clearTimeout(timer);
          uni.hideLoading();
        }, timing)
      }
    })
  })

}

export {
  useJumpTo, useShowLoading, useShowMessage
};

