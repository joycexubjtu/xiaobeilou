const appConfig = require('../../config');
//获取应用实例
const app = getApp()
Page({
  data: {
    hasUserInfo : true,
    list: {
      shi: {
        id: 'shi',
        name: '小学生必备古诗词',
        desc:'共75首古诗',
        bgimg: 'bg-shi.png',
        page: 'list-shi',
        url: '/page/recite/pages/list-shi/list-shi',
        count: 0
      },
      daka: {
        id: 'daka',
        name: '犹太式辅导法打卡',
        desc: '',
        bgimg: 'bg-daka.png',
        page: '../../daka/index',
        url: '/page/daka/index',
        count: 1
      },
      jianshi: {
        id: 'jianshi',
        name: '人类简史时间轴',
        desc: '',
        bgimg: 'bg-js.png',
        page: 'list-js',
        url: '/page/recite/pages/list-js/list-js',
        count: 1
      },
      ciyu: {
        id: 'ciyu',
        name: '二年级下必会词语（人教版）',
        desc: '',
        bgimg: 'bg-ciyu.png',
        page: 'list-ciyu',
        url: '/page/recite/pages/list-ciyu/list-ciyu',
        count: 1
      }
    }
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var shi_count = wx.getStorageSync('shi_count');
    if (shi_count) {
      this.setData({
        'list.shi.desc': '共' + shi_count + '首'
      })
    } 
  },
  
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})