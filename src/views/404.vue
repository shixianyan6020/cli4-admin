<!--
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 18:08:01
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-20 21:25:40
 -->
<template>
  <div class="set404" style="text-align: center;">
    <IconFont type="icon-icon-404" style="font-size:100px"></IconFont>
    <!-- 第一种引入的方法 step1 -->
    <!-- <img :src="logo" alt="图片开小差了"> -->
    <Logo class="setImg" />
  </div>
</template>

<script type="text/javascript">
import Logo from '@/assets/logo.svg' // step2 这个地方必须是svg 格式的图标
export default {
  name: "app",
  data() {
    return {
      // logo // step3
      age: '17'
    };
  },
  components: {
    Logo
  }
};
</script>

<style scope>
.setImg {
  width: 100px;
  height: 100px;
}
</style>