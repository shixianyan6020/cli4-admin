<!--
 * @Author: sxy
 * @Date: 2020-03-21 17:11:43
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-23 12:06:54
 * @Description:
 -->
<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>
<script>
// 控制显示的语言类型
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import moment from "moment";
import "moment/locale/zh-cn"; // 引入语言包，这样的话默认只会打包中文包（优化的部分*）
export default {
  data() {
    return {
      locale: zhCN
    };
  },
  watch: {
    "$route.query.locale": function(val) {
      this.locale = val === "enUS" ? enUS : zhCN;
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    }
  }
};
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>