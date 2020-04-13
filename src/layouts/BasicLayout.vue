<!--
 * @Description: 
 * @Author: sxy
 * @Date: 2020-03-18 18:47:31
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-27 10:16:42
 * @descriot: 此页面主要搭建界面的整体布局分为四大模块 侧边栏-头部-内容区域-底部
 -->
<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!--侧边栏 -->
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <div class="logo">logo</div>
        <SideMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <!-- 公共头部 -->
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <!--内容区域 -->
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <!--公共底部 -->
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!--使用抽屉功能组件 -->
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script type="text/javascript">
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import SettingDrawer from "../components/SettingDrawer";
export default {
  name: "app",
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Header,
    Footer,
    SideMenu,
    SettingDrawer
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  }
};
</script>

<style lang="less" scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eeeeee;
}
.nav-theme-dark .logo {
  color: #fff;
}
.logo {
  line-height: 64px;
  text-align: center;
  color: #000;
  height: 64px;
  overflow: hidden;
}
</style>
