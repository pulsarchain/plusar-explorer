const wsURL = process.env.wsURL;
// 重连
function reconnect(url) {
  setTimeout(function() {
    //没连接上会一直重连，设置延迟避免请求过多
    createWebSocket(url);
  }, 2000);
}

export default class WS {
  constructor(options = {}) {
    this.lockReconnect = false;
    const { url = wsURL, protocols, onOpened, onClosed, onMessage } = options;
    const ws = new WebSocket(url, protocols);
    ws.onopen = e => {
      console.log("%c%s", "color:green;", "ws opened");
      this.heartbeat();
      onOpened && onOpened(e);
    };
    ws.onclose = e => {
      this.reconnect(url);
      onClosed && onClosed(e);
    };
    ws.onmessage = e => {
      this.heartbeat();
      try {
        const message = JSON.parse(e.data);
        console.log("%c%s", "color:green;", "ws message", message);
        onMessage && onMessage(message);
      } catch (err) {}
    };
    ws.onerror = () => {
      console.log("%c%s", "color:red;", "ws error");
      this.reconnect(url);
    };
    this.ws = ws;
  }
  reconnect(url) {
    if (this.lockReconnect || this.forbidReconnect) return;
    this.lockReconnect = true;
    // 没连接上会一直重连，设置延迟避免请求过多
    setTimeout(() => {
      console.log("%c%s", "color:purple;", "ws reconnect");
      this.ws = new WebSocket(url);
      this.lockReconnect = false;
    }, 2000);
  }
  heartbeat() {
    const pingTimeout = 10000; // 未收到消息多少秒之后发送ping请求, 毫秒
    const pongTimeout = 10000; // 发送ping之后，未收到消息超时时间，毫秒
    clearTimeout(this.pingTimeout);
    clearTimeout(this.pongTimeout);
    if (this.forbidReconnect) return; // 不再重连就不再执行心跳
    this.pingTimeout = setTimeout(() => {
      this.ws.send("PING");
      // 如果超过一定时间还没重置，说明后端主动断开了
      this.pongTimeout = setTimeout(() => {
        this.ws.close();
      }, pongTimeout);
    }, pingTimeout);
  }
  close() {
    console.log("%c%s", "color:purple;", "ws closed");
    this.forbidReconnect = true;
    this.heartbeat();
    this.ws.close();
  }
}
