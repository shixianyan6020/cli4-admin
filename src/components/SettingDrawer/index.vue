<!--
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-20 11:17:30
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-22 15:27:13
 -->
<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
      <template>
        <div class="setting-drawer-handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h2>整体风格制定</h2>
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          @change="e => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          @change="e => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      navTheme: "dark",
      navLayout: "left"
    };
  },
  methods: {
    handleSettingChange(type, value) {
      console.log(this.$route.query);
      this.$router.push({
        // 把右边抽屉中设置的值保存到路由里面
        query: { ...this.$route.query, [type]: value } // se6对象的解构赋值
      });
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" src="./index.less"></style>
