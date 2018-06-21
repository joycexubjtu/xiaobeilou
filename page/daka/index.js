'use strict';
var util = require('../../util/util.js')
const app = getApp();
const appConfig = require('../../config');

let choose_year = null,
  choose_month = null;
const conf = {
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    showtype: 'stat',
    total:0
  },
  onLoad() {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    });
  },
  recordResult: function() {
    var today = new Date();
    var currentDay = today.getDate();
    var days = this.data.days;
    for (let i = 0; i < days.length; i++) {
      if (days[i]['day'] == currentDay && days[i]['count']==1) {
        wx.showToast({
          title: '您已经打过卡了哦，无需重复打卡',
          icon: 'none',
          duration: 1000
        })
        return;;
      } 
    }
    var res = {
      daka_time: util.getCurrentDateTime(),
      openid: app.globalData.openid
    };
    let that = this;
    res['sessionid'] = wx.getStorageSync('session_id');
    wx.request({
      url: appConfig.dakaRecordUrl, //记录结果
      data: res,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.showToast({
          title: '打卡成功',
          icon: 'success',
          duration: 2000
        })
        that.calculateDays(that.data.cur_year, that.data.cur_month);
      }
    })
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];
    let that = this;
    const thisMonthDays = this.getThisMonthDays(year, month);
    wx.request({
      url: appConfig.dakaStatUrl,
      data: {
        sessionid: wx.getStorageSync('session_id'),
        year: year,
        month: month
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      fail: function (res) {
        console.log(res);
      },
      success: function (res) {
        var stat = res.data.data.daystat;
        for (let i = 1; i <= thisMonthDays; i++) {
          if (stat[i]) {
            days.push({
              day: i,
              count: stat[i],
              choosed: false
            });
          } else {
            days.push({
              day: i,
              count: 0.1,
              choosed: false
            });
          }
        }
        that.setData({
          days
        });
        var total = res.data.data.total;
        that.setData({
          total:total
        });
      }
    })

  },

  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });
    }
  },
  tapDayItem(e) {
    const idx = e.currentTarget.dataset.idx;
    const days = this.data.days;
    days[idx].choosed = !days[idx].choosed;
    this.setData({
      days,
    });
  },
  chooseYearAndMonth() {
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    let picker_year = [],
      picker_month = [];
    for (let i = 1900; i <= 2100; i++) {
      picker_year.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      picker_month.push(i);
    }
    const idx_year = picker_year.indexOf(cur_year);
    const idx_month = picker_month.indexOf(cur_month);
    this.setData({
      picker_value: [idx_year, idx_month],
      picker_year,
      picker_month,
      showPicker: true,
    });
  },
  pickerChange(e) {
    const val = e.detail.value;
    choose_year = this.data.picker_year[val[0]];
    choose_month = this.data.picker_month[val[1]];
  },
  tapPickerBtn(e) {
    const type = e.currentTarget.dataset.type;
    const o = {
      showPicker: false,
    };
    if (type === 'confirm') {
      o.cur_year = choose_year;
      o.cur_month = choose_month;
      this.calculateEmptyGrids(choose_year, choose_month);
      this.calculateDays(choose_year, choose_month);
    }

    this.setData(o);
  }
};

Page(conf);
