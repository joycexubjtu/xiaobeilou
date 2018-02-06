const openIdUrl = require('./config').openIdUrl

App({
  onLaunch: function () {
    var self = this;
    console.log('App Launch')
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://www.xjjstudy.com/index.php/api/login', //仅为示例，并非真实的接口地址
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
            wx.setStorage({
              key: "session_id",
              data: data.sessionid
            })
            self.globalData.hasLogin = true;
            self.globalData.openid = data.openid;
            console.log(self.globalData);
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
  globalData: {
    hasLogin: false,
    openid: null,
    userInfo: null
  }
})
