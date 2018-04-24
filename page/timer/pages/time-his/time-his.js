var util = require('../../../../util/util.js');
const app = getApp();
const appConfig = require('../../../../config');
Page({
  data: {
    count: 0,
    history: []
  },
  onLoad: function () {
    this.getHistory();
  },
  getHistory() {
    let that = this;
    wx.request({
      url: appConfig.historyStatForTime,
      data: {
        sessionid: wx.getStorageSync('session_id')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.status === 0) {
          let data = res.data.data;
          that.setData({
            history: data.history,
            count: data.count
          });
        }
      }
    })
  }
})