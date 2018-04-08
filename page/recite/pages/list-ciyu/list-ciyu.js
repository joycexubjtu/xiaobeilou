// page/recite/pages/list-ciyu/list-ciyu.js
var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    inputShowed: false,
    unit: 1,
    courseSelected: {},
    course: [],
    group: 'unit',
    dataset: [],
    ciyu: [],
    ciyu_t:[],
    testStatus: false,
    count: 0,
    count_s: 0,
    count_f: 0,
    classmap: {0:'normal', 1:'success', 2:'fail'},
    currentPage: 1
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
    this.changeCourse();
  },
  changeUnit: function (event) {
    var id = event.currentTarget.dataset.id;
    this.setData({ unit: id});
    this.changeUnitCourses();
  },
  changeUnitCourses: function () {
    var id = this.data.unit;
    var courses = this.data.dataset[id]['courseList'];
    var coursesSelected = {}, course = [];
    for (var i in courses) {
      course.push(courses[i]['id']);
      coursesSelected[courses[i]['id']] = 1;
    }
    this.setData({ course: course, courseSelected: coursesSelected });
    this.changeCourse();
  },
  checkCourse: function(event) {
    var id = event.currentTarget.dataset.id;
    var courseSelected = this.data.courseSelected;
    console.log(id);
    console.log(this.data.courseSelected[id]);
    if (this.data.courseSelected[id]==1) {
      courseSelected[id] = 0;
      
    } else {
      courseSelected[id] = 1;
    }
    this.setData({ courseSelected: courseSelected });
    console.log(this.data.courseSelected[id]);
    this.changeCourse();
  },
  changeCourse: function () {
    var ciyu_list = this.data.dataset;
    //根据选择的单元和课程列表筛选
    var unit = this.data.unit, id = '', ciyu_sel = [];
    var courses = this.data.dataset[unit]['courseList'];
    var ciyu = [];
    
    for (var c in courses) {
      if (this.data.courseSelected[c]==1) {
        //选中的课程
        var ciyumap = courses[c]['ciyu'];
        for (var kw in ciyumap) {
          var wlist = [];
          if (this.data.inputVal != "") {
            var wlistall = ciyumap[kw];
            for (var ww in wlistall) {
              if (wlistall[ww]['name'].indexOf(this.data.inputVal) == -1) {
                continue;
              }
              wlist.push(wlistall[ww]);
            }
          } else {
            wlist = ciyumap[kw];
          }
          if (wlist.length>0) {
            ciyu.push({ 'kw': kw, 'word': wlist, 'status':0});
          }
        }
      }
    }
    this.setData({
      'ciyu': ciyu
    })
  },
  goTest: function () {
    let that = this;
    var count = 0;
    if (that.data.testStatus === false) {
      wx.showLoading({
        title: '准备词语中！',
      })
      var ciyu = this.data.ciyu;
      var wdlist = [], tmp = [], wd = {};
      for (var i in ciyu) {
        for (var j in ciyu[i]['word']) {
          wd = ciyu[i]['word'][j];
          wd['status'] = 0;
          wd['kw'] = ciyu[i]['kw'];
          wdlist.push(wd);
          count++;
        }
      }
      this.setData({
        ciyu_t: wdlist,
        testStatus: true,
        count: count,
        count_s: 0,
        count_f: 0,
        pos: 0
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
    } else {
      that.endTest();
    }
  },
  endTest: function() {
    let that = this;
    wx.showModal({
      title: '此次听写结果',
      content: "共听写"+(this.data.count_s + this.data.count_f) + "个单词，错误" + this.data.count_f + "个",
      success: function (res) {
        if (res.confirm) {
          that.setData({
            ciyu_t: [],
            testStatus: false
          })
        } 
      }
    })
  },
  goWrong: function() {
    var ciyu_t = this.data.ciyu_t;
    var pos = this.data.pos;
    var count_f = this.data.count_f;
    ciyu_t[pos]['status'] = 2;
    count_f ++;
    if (pos<this.data.count) {
      pos ++;
      this.setData({
        pos: pos,
        count_f: count_f,
        ciyu_t, ciyu_t
      });
    }
  },
  goRight: function() {
    var ciyu_t = this.data.ciyu_t;
    var pos = this.data.pos;
    var count_s = this.data.count_s;
    ciyu_t[this.data.pos]['status'] = 1;
    count_s++;
    this.setData({
      count_s: count_s,
      ciyu_t, ciyu_t
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ciyu = wx.getStorageSync('ciyu_list');
    var units = ciyu.keys, unit = 1;
    this.setData({
      'unit': unit,
      'dataset': wx.getStorageSync('ciyu_list')
    })
    this.changeUnitCourses();
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
  
  },
  pageChange: function(e) {
    this.setData({
      currentPage: e.detail.current + 1
    })
  }
})