var util = require('../../../../util/util.js');
const app = getApp();
const appConfig = require('../../../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    title: '',
    count: 0,
    period: 1,
    history:[]
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
    var count = shi_detail.count;
    var period = parseInt(count / 3) + 1 ;
    if (period>7) {
      period = 7;
    }
    if (period<=0) {
      period = 1;
    }
    this.setData({
      id: options.id,
      title: shi_detail.title,
      count: count,
      period: period
    })
    this.getHistory();
    console.log(this.data);
  },
  getHistory() {
    let that = this;
    wx.request({
      url: appConfig.historyStatForShi,
      data: {
        id : that.data.id,
        sessionid: wx.getStorageSync('session_id')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status === 0) {
          let data = res.data.data;
          that.setData({
            history: data
          });
        }
      }
    })
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