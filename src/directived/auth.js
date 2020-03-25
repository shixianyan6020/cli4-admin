/*
 * @Description: 自定义权限指令 缺点是，配置之后就不能改动
 * @Author: sxy
 * @Date: 2020-03-23 16:25:32
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-23 16:54:30
 */
import { check } from "../utils/auth";

function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}
export default { install };
