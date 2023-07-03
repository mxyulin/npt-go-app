import { unref } from 'vue';

function useShowMessage(msg) {
  let title = unref(msg);

  uni.showToast({
    title,
    icon: 'none',
    mask: true,
    duration: 3000
  })
}

function useJumpTo(route, msg){
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

export {
  useJumpTo, useShowMessage
};

