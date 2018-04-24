const appConfig = require('./config');

App({
  onLaunch: function () {
    var self = this;
    wx.login({
      success: res => {
        wx.request({
          url: appConfig.loginUrl2, 
          data: {
            code: res.code,
            sessionid: wx.getStorageSync('session_id')
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' 
          },
          success: function (res) {
            var data = res.data;
            //TODO:异常情况的处理
            wx.setStorageSync("session_id", data.sessionid);
            self.globalData.hasLogin = true;
            self.globalData.openid = data.openid;
            //初始化数据
            self.initData();
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  requestData: function () {
    var self = this;
    wx.request({
      url: appConfig.listUrl, //获取所有数据列表
      data: {
        sessionid: wx.getStorageSync('session_id')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var shi = res.data.data.shi;
        //TODO:异常情况的处理
        wx.setStorageSync("shi_count", shi.length);
        var shi_map = {};
        for (var i = 0; i < shi.length; i++) {
          shi_map[shi[i]['id']] = i;//记录id与index的对应关系
        }
        wx.setStorageSync("shi_map", shi_map);
        wx.setStorageSync("shi_list", shi);
        var ciyu = res.data.data.ciyu;
        wx.setStorageSync("ciyu_count", ciyu.length);
        wx.setStorageSync("ciyu_list", ciyu);
      }
    })
  },
  initData: function () {
    var self = this;
    self.requestData();
  },
  globalData: {
    hasLogin: false,
    openid: null,
    userInfo: null
  }
})