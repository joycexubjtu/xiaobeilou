const app = getApp();
var util = require('../../util/util.js')
var intt;
const appConfig = require('../../config');

Page({
  data: {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    int: '00 : 00',
    starttime: '',
    threshold: 5,
    overtime: false,
    timing: false,
    task: '',
    taskMap: {
      compute: { name:'口算题卡',th:3},
      math: { name: '数学作业', th: 60},
      chinese: { name: '语文作业', th: 60 },
      dinner: { name: '吃饭', th: 30 },
      wash: { name: '洗漱', th: 10 },
      getup: { name: '起床', th: 10 },
      play: { name: '玩游戏', th: 30 },
      tv: { name: '看电视', th: 30 },
      phone: { name: '玩手机', th: 30 },
    },
    s: null
  },
  doTask: function(e) {
    var task = e.currentTarget.dataset.task;
    var taskinfo = this.data.taskMap[task];
    this.setData({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      int: '00 : 00',
      timing: false,
      overtime: false,
      threshold: taskinfo['th'],
      task: taskinfo['name']
    })
  },
  start: function () {
    if (this.data.timing) {
      return;
    }
    var that = this;
    clearInterval(intt);
    //时间重置
    that.setData({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      int: '00 : 00',
      timing: true,
      overtime: false,
      starttime: util.getCurrentDateTime(),
      s: new Date()
    })
    intt = setInterval(function () { that.timer() }, 1000);
    
  },
  //完成
  stop: function () {
    if (!this.data.timing) {
      return;
    }
    var that = this;
    clearInterval(intt);
    var result = that.data.overtime ?1:0;
    var res = {
      record_time: that.data.starttime,
      result: result,
      task: that.data.task,
      use_time: that.data.int,
      openid: app.globalData.openid
    };
    var tips = '你好棒哦，完成的又快又好！这次用时'+that.data.int;
    if (that.data.overtime) {
      tips = '要加油哦，下次争取更快好不好？这次用时' + that.data.int;
    }
    wx.showModal({
      title: that.data.task,
      content: tips,
      showCancel: false
    })
    that.recordResult(res);
    that.setData({
      timing: false,
      task:''
    })
  },
  //放弃
  reset: function () {
    var that = this;
    if (this.data.timing) {
      wx.showModal({
        title: '提示',
        content: '您确定要取消计时吗？取消不会被记录。',
        cancelText: '暂不取消',
        confirmText: '取消计时',
        success: function (res) {
          if (res.confirm) {
            clearInterval(intt);
            that.setData({
              hour: 0,
              minute: 0,
              second: 0,
              millisecond: 0,
              int: '00 : 00',
              timing: false,
              task: ''
            })
          }
        }
      })
    } else {
      clearInterval(intt);
      that.setData({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        int: '00 : 00',
        timing: false,
        task: ''
      })
    }
  },
  recordResult: function (res) {
    res['sessionid'] = wx.getStorageSync('session_id');
    wx.request({
      url: appConfig.timeResultUrl,
      data: res,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      }
    })
  },
  timer: function () {
    var that = this;
    var curtime = new Date();
    var second = parseInt(curtime - that.data.s) / 1000;
    var m = parseInt(second / 60);
    var s = parseInt(second % 60);
    var display_m = m, display_s = s;
    if (display_m < 10) {
      display_m = '0' + display_m;
    }
    if (display_s < 10) {
      display_s = '0' + display_s;
    }
    if (!that.data.overtime && m >= that.data.threshold) {
      that.setData({
        overtime: true
      })
    }
    that.setData({
      int: display_m + " : " + display_s
    })
  }
})