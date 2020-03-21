/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 10:02:02
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-20 15:15:08
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入ant ui 库 因为在 balel 里面配置过了，这里不需要再额外的添加ant 样式
import { Button, Layout, Icon, Drawer, Radio, Menu } from "ant-design-vue";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
