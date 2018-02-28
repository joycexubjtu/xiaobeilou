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
    wx.request({
      url: appConfig.shiListUrl, //获取所有古诗列表
      data: {
        sessionid: wx.getStorageSync('session_id')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var data = res.data.data;
        //TODO:异常情况的处理
        wx.setStorageSync("shi_count",data.length);
        var shi_map = {};
        for (var i = 0; i < data.length; i++) {
          shi_map[data[i]['id']] = i;//记录id与index的对应关系
        }
        wx.setStorageSync("shi_map", shi_map);
        wx.setStorageSync("shi_list", data);
      }
    })
  },
  initData: function () {
    var self = this;
    wx.request({
      url: appConfig.shiCountUrl, //获取所有古诗个数
      data: {
        sessionid: wx.getStorageSync('session_id')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var remote_count = res.data.data;
        try {
          var local_count = wx.getStorageSync('shi_count');
          if (!local_count || local_count != remote_count) {
            self.requestData();
          }
        } catch (e) {
          self.requestData();
        }
      }
    })
  },
  globalData: {
    hasLogin: false,
    openid: null,
    userInfo: null
  }
})