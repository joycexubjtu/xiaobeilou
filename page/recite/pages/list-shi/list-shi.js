const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    inputShowed: false,
    current : 1,
    group: 'period',
    dataset: [],
    list: [
      {
        id: 1,
        author: '李白',
        data: [
          {
            id : 1,
            title: '望庐山瀑布'
          },
          {
            id: 2,
            title: '赠汪伦'
          },
          {
            id: 3,
            title: '还有啥？'
          }
        ]
      },
      {
        id: 2,
        author: '杜甫'
      }
    ]
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
    this.setData({current:id});
  },
  changeTab: function (event) {
    var group = event.currentTarget.dataset.group;
    this.setData({
      'group': group
    })
    this.changeGroup();
  },
  changeGroup: function () {
    var shi_list = this.data.dataset;
    var group = this.data.group;
    var group_map = {}, id = 1;
    if (group=='period') {
      group_map = { 
                    '未背诵': { 'id': 1, 'group': '未背诵', 'data': [] },
                    '萌芽': { 'id': 2, 'group': '萌芽', 'data': [] },
                    '生长': { 'id': 3, 'group': '生长', 'data': [] },
                    '成熟': { 'id': 4, 'group': '成熟', 'data': [] },
                    '采摘': { 'id': 5, 'group': '采摘', 'data': [] },
                  }; 
    }
    for (var i = 0; i < shi_list.length; i++) {
      
      var groupval = shi_list[i][group];
      if (this.data.inputVal != "") {
        if (groupval.indexOf(this.data.inputVal) == -1 && shi_list[i]['title'].indexOf(this.data.inputVal) == -1 && shi_list[i]['dynasty'].indexOf(this.data.inputVal) == -1) {
          continue;
        }
      } 
      if (typeof (group_map[groupval]) == 'undefined') {
        group_map[groupval] = { 'id': id, 'group': groupval, 'data': [] };
        id++;
      }
      group_map[groupval]['data'].push({ id: shi_list[i]['id'], title: shi_list[i]['title'] });
    }
    this.setData({
      'list': group_map,
      'group': group,
      'current': 1
    })
  },
  onReady: function(event) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shilist = wx.getStorageSync('shi_list');
    if (!shilist) {
      app.requestData();
    }
    this.setData({
      'dataset': wx.getStorageSync('shi_list')
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