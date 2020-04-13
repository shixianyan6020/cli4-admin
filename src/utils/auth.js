/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-21 15:36:52
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-27 10:42:12
 * @desc: 存放权限校验的函数
 */

// 获取权限
export function getCurrentAuthority() {
  return ["admin"];
}

// 验证权限
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}
// 验证是否允许登录
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "user";
}
