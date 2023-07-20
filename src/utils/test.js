function test_webSocket(url, msgs) {
  let socketOpen = false;

  uni.connectSocket({ url });
  uni.onSocketOpen((res) => {
    console.log('%c WebSocket连接已打开！', 'grcolor: een; font-size: 2em');

    socketOpen = true;
    msgs.forEach(msg => {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
        sendSocketMessage(msg);
      }, 1500);
    });
  });

  uni.onSocketError((res) => {
    console.log('%c WebSocket连接失败！', 'color: red; font-size: 2em');
  })

  function sendSocketMessage(msg) {
    if (socketOpen) {
      uni.sendSocketMessage({
        code: 200,
        data: msg,
        desc: '客户端消息',
        sn: 'uuid:test123',
        tamp: `${Date.now()}`
      });
    }
  }
}

export {
  test_webSocket
};

