self.importScripts("./goeasy.min.js")

var goEasy = GoEasy.getInstance({
    host: "hangzhou.goeasy.io",
    appkey: "BC-1e46fd20681e42ccb085c22219c395bf",
    modules: ["pubsub"]
});

goEasy.connect({
    id: "user01",
    onSuccess: () => {
        console.log("GoEasy connect successfully.");
    },
    onFailed: function(error) {
        let log = "Failed to connect GoEasy, code:" + error.code + ",error:" + error.content;
        console.log(log);
    },
    onProgress: function(attempts) {
        let log = "GoEasy is connecting" + attempts;
        console.log(log);
    }
});

goEasy.pubsub.subscribe({
    channel: "test_channel",
    onMessage: function(message) {
        console.log('接收消息：',message)
        let log = "message time: " + (new Date().getTime()-message.time) + ",接收消息: Channel:" + message.channel +
            " content:" + message.content;
        console.log(log);
    },
    onSuccess: function() {
        let log = "Channel订阅成功。";
        console.log(log);
    },
    onFailed: function(error) {
        let log = "Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content;
        console.log(log);
    }
});

self.addEventListener("fetch", function(e) {
    console.log("Fetch request for: ", e.request.url);
});

self.addEventListener('message', e => {
    console.log('sw onMessage',e);
    // 向特定窗口返回消息
    e.source.postMessage('response from service worker')
});

