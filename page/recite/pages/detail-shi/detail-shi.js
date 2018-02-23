var util = require('../../../../util/util.js')
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
    title : '望庐山瀑布', 
    author : '李白',
    dynasty : '唐',
    content: [['日', '照', '香', '炉', '生', '紫','烟，'], 
      ['遥', '看', '瀑', '布', '挂', '前','川，'], 
      ['飞', '流', '直', '下', '三', '千','尺，'],
      ['疑', '是', '银', '河', '落', '九','天。']]
  },
  startRecite: function(event) {
    this.setData({
      recite: true
    })
  },
  goTest: function () {
    let that = this;
    if (that.data.testStatus === false) {
      that.setData({
        testStatus: true
      })
    } else {
      that.setData({
        testStatus: false
      })
      wx.showModal({
        title: '背过了吗？',
        content: '小朋友，如果背过了就点确定，没背过就点取消哦:)',
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
        }
      })
    }

  },
  recordResult: function(res) {
    res['sessionid'] = wx.getStorageSync('session_id');
    wx.request({
      url: 'https://www.xjjstudy.com/index.php/api/record', //记录结果
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
      content: content_arr
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