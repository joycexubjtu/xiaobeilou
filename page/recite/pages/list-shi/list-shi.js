// page/recite/pages/list-shi/list-shi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current : 1,
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
  changeType: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id);
    this.setData({current:id});
  },
  onReady: function(event) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shi_list = wx.getStorageSync('shi_list');
    var author_map = {}, id=1;
    for (var i=0;i<shi_list.length;i++) {
      var author = shi_list[i]['author'];
      if (typeof (author_map[author])=='undefined' ) {
        author_map[author] = {'id':id,'author': author, 'data' : []};
        id ++;
      }
      author_map[author]['data'].push({id:shi_list[i]['id'], title:shi_list[i]['title']});
    }
    this.setData({
      'list': author_map
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