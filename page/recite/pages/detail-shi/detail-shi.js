var util = require('../../../../util/util.js')
const appConfig = require('../../../../config');
// page/recite/pages/detail-shi/detail-shi.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testStatus: false,
    recite : false,
    id : 1,
    title : '', 
    author : '',
    dynasty : '',
    content: [],
    cstatus: {},
    astatus: false
  },
  startRecite: function(event) {
    this.setData({
      recite: true,
      cstatus: {}
    })
  },
  showauthortips: function(e) {
    if (e.target.dataset.status == 'recite') {
      this.setData({
        astatus: true
      });
    }
  },
  showtips: function(e) {
    if (e.target.dataset.status=='recite') {
      //e.target
      var index = e.target.dataset.key;
      var cstatus = this.data.cstatus;
      cstatus[index] = true;
      this.setData({
        cstatus : cstatus
      });
    }
  },
  goTest: function () {
    let that = this;
    if (that.data.testStatus === false) {
      that.setData({
        testStatus: true,
        cstatus: {},
        astatus: false
      })
    } else {
      wx.showModal({
        title: '背过了吗？',
        content: '如果背过了就点确定，没背过就点取消哦',
        success: function (res) {
          var result = 0;
          if (!res.confirm) {
            result = 1; //没背过
          }
          var res = {
            recite_time: util.getCurrentDateTime(),
            type:0,
            result:result,
            recite_target: that.data.id,
            openid: app.globalData.openid
          };
          that.recordResult(res);
          that.setData({
            testStatus: false
          })
        }
      })
    }

  },
  recordResult: function(res) {
    res['sessionid'] = wx.getStorageSync('session_id');
    wx.request({
      url: appConfig.shiResultUrl, //记录结果
      data: res,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    var shi_list = wx.getStorageSync('shi_list');
    var shi_map = wx.getStorageSync('shi_map');
    var shi_index = shi_map[options.id];
    var shi_detail = shi_list[shi_index];
    var content_arr = shi_detail.content.split("\r\n");
    this.setData({
      id: options.id,
      author: shi_detail.author,
      title: shi_detail.title,
      dynasty: shi_detail.dynasty,
      content: content_arr
    })
    console.log(this.data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})