/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-21 17:11:43
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-20 19:45:33
 */
import Vue from "vue";
import Vuex from "vuex";
import form from "./modules/form";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { // 在modules里面导入我们在modules文件下定义的模块
    form
  }
});
