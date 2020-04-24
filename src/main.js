/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 10:02:02
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-23 11:01:13
 */
import Vue from "vue";
import VueI18n from 'vue-i18n';
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import enUS from "./locale/enUS";
import zhCN from "./locale/zhCN";
import queryString from 'query-string'
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
  LocaleProvider,
  Dropdown,
  DatePicker,
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
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});
// 引入全局的指令
Vue.use(Auth);
Vue.component("Authorized", Authorized);

// 引入图标库
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1768068_c00g9vo3vi.js',
});

// 全局注册组件库
Vue.component("IconFont", IconFont)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
