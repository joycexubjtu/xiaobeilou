// page/recite/pages/detail-shi/detail-shi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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