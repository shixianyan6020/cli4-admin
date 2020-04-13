/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 10:02:02
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-26 19:49:06
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
// 引入ant ui 库 因为在 balel 里面配置过了，这里不需要再额外的添加ant 样式
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select
} from "ant-design-vue";
import Authorized from "./components/Authorized"; // 把该组件注册成为一个全局的组件
import Auth from "./directived/auth"; // 自定义全局的指令

Vue.config.productionTip = false;
// 按需引入UI组件
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Form);
Vue.use(Select);

// 引入全局的指令
Vue.use(Auth);
Vue.component("Authorized", Authorized);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
