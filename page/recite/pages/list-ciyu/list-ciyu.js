// page/recite/pages/list-ciyu/list-ciyu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    inputShowed: false,
    current: 1,
    group: 'unit',
    dataset: [],
    list: []
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    //this.changeGroup();
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    this.changeGroup();
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  searchData: function () {
    this.changeGroup();
  },
  changeType: function (event) {
    var id = event.currentTarget.dataset.id;
    this.setData({ current: id });
  },
  changeTab: function (event) {
    var group = event.currentTarget.dataset.group;
    this.setData({
      'group': group
    })
    this.changeGroup();
  },
  changeGroup: function () {
    var ciyu_list = this.data.dataset;
    var group = this.data.group;
    var group_map = {}, id = 1;
    for (var i = 0; i < ciyu_list.length; i++) {
      var groupval = ciyu_list[i][group];
      if (this.data.inputVal != "") {
        if (groupval.indexOf(this.data.inputVal) == -1 && ciyu_list[i]['title'].indexOf(this.data.inputVal) == -1) {
          continue;
        }
      }
      if (typeof (group_map[groupval]) == 'undefined') {
        group_map[groupval] = { 'id': id, 'group': groupval, 'data': [] };
        id++;
      }
      group_map[groupval]['data'].push({ id: ciyu_list[i]['id'], title: ciyu_list[i]['title'] });
    }
    this.setData({
      'list': group_map,
      'group': group,
      'current': 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'dataset': wx.getStorageSync('ciyu_list')
    })
    this.changeGroup();
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