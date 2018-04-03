const appConfig = require('./config');

App({
  onLaunch: function () {
    var self = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: appConfig.loginUrl, 
          data: {
            code: res.code,
            sessionid: wx.getStorageSync('session_id')
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' 
          },
          success: function (res) {
            console.log(res);
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
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
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
        console.log(res);
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
        /*var ciyu_map = {};
        for (var i = 0; i < ciyu.length; i++) {
          ciyu_map[ciyu[i]['id']] = i;//记录id与index的对应关系
        }
        wx.setStorageSync("ciyu_map", ciyu_map);*/
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