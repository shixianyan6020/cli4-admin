/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-23 21:43:21
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-23 22:27:55
 */
function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [100, 30, 40, 78, 90, 80];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
