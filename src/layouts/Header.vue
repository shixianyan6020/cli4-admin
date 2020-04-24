<!--
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 18:47:31
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-23 11:27:49
 -->
<template>
  <div class="header">
   <a-dropdown>
    <a-icon type="global" />
    <a-menu slot="overlay" @click="localeChange" :selectedKeys="[$route.query.local || 'zh']">
      <a-menu-item key="zhCN">
        中文
      </a-menu-item>
      <a-menu-item key="enUS">
        English
      </a-menu-item>
    </a-menu>
  </a-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    localeChange(val) {
      this.$router.push({query: {...this.$router.query, locale: val.key}}),
      this.$i18n.locale = val.key // val.key = "zhCN" 或者 val.key = "enUS"

    }
  },
};
</script>

<style lang="less" scoped>
  .header {
    float: right;
    margin-right: 30px;
  }
</style>
