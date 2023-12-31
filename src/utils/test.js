/**
 * 测试 websocket 接口
 * @param {String} url 
 * @param {Array} msgs 
 */
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

/*  */
function test_getAutoPos(size) {
  const canSelectionArea = {
    '9X9': {
      min: 36,
      max: 684
    },
    '13X13': {
      min: 28.5,
      max: 691.5
    },
    '15X15': {
      min: 22.5,
      max: 697.5
    },
    '19X19': {
      min: 18,
      max: 702
    },
  };

  return {
    x: Math.round(Math.random() * (canSelectionArea[size].max - canSelectionArea[size].min) + canSelectionArea[size].min),
    y: Math.round(Math.random() * (canSelectionArea[size].max - canSelectionArea[size].min) + canSelectionArea[size].min)
  }
}

export {
  test_getAutoPos, test_webSocket
};

