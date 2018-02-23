function getCurrentDateTime() {
  var today = new Date();   // 获取当前时间
  //var time = today.format('Y-m-d H:i:s');  //格式化时间
  var fmt = "yyyy-MM-dd hh:mm:ss";
  var o = {
    "M+": today.getMonth() + 1,                 //月份 
    "d+": today.getDate(),                    //日 
    "h+": today.getHours(),                   //小时 
    "m+": today.getMinutes(),                 //分 
    "s+": today.getSeconds(),                 //秒 
    "q+": Math.floor((today.getMonth() + 3) / 3), //季度 
    "S": today.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (today.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt; 
}
function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  getCurrentDateTime: getCurrentDateTime
}
