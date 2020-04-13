/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-26 19:28:43
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-26 19:30:22
 */
function form(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = { message: "ok" };
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = form;
