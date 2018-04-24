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
    currentPage: 0,
    lastPage: 0
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
    var count_f = this.data.count_f;
    var last_p = this.data.lastPage;
    var ciyu_l = ciyu_t.length - 1;
    if (ciyu_t[last_p]['status']==0) {
      ciyu_t[last_p]['status'] = 2;
      count_f++;
    }
    if (last_p === ciyu_l) {
      this.setData({
        count_f: count_f,
        ciyu_t, ciyu_t,
        currentPage: 0
      });
    } else {
      this.setData({
        count_f: count_f,
        ciyu_t, ciyu_t,
        currentPage: last_p + 1
      });
    }
  },
  goRight: function() {
    var ciyu_t = this.data.ciyu_t;
    var count_s = this.data.count_s;
    var last_p = this.data.lastPage;
    var ciyu_l = ciyu_t.length - 1;
    if (ciyu_t[last_p]['status'] == 0) {
      ciyu_t[last_p]['status'] = 1;
      count_s++;
    }
    if (last_p === ciyu_l){
      this.setData({
        count_s: count_s,
        ciyu_t, ciyu_t,
        currentPage: 0
      });
    }else{
      this.setData({
        count_s: count_s,
        ciyu_t, ciyu_t,
        currentPage: last_p + 1
      });
    }
    
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
  pageChange: function(e) {
    this.setData({
      lastPage: e.detail.current
    })
  }
})