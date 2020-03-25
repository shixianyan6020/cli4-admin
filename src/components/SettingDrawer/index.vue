<!--
 * @Description: 
 * @Author: sxy
 * @Date: 2020-03-20 11:17:30
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-23 14:55:44
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
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
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

<style lang="less" scoped>
.header {
  float: right;
}
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
  cursor: pointer;
}
</style>
