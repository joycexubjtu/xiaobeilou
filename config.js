/**
 * 小程序配置文件
 */

var host = "www.xjjstudy.com"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  // 登录地址，用于建立会话
  loginUrl: `https://${host}/index.php/api/login`,

  // 获取古诗列表
  shiListUrl: `https://${host}/index.php/api/list`,

  // 获取古诗个数
  shiCountUrl: `https://${host}/index.php/api/shicount`,

  // 统计概况
  totalStat: `https://${host}/index.php/stat/`,

  // 日历统计
  calendarStat: `https://${host}/index.php/stat/calendar`,

  // 历史统计
  historyStat: `https://${host}/index.php/stat/history`,
};

module.exports = config
