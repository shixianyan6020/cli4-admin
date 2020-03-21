<!--
 * @Description: 
 * @Author: sxy
 * @Date: 2020-03-20 15:15:52
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-21 15:23:39
 -->
<template functional>
  <!-- functional 添加functional = true 表示这个组件是函数式组件，没有this上下文，没有data,没有状态（没有响应式数据） -->
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon
        v-if="props.menuInfo.meta.icon"
        :type="props.menuInfo.meta.icon"
      />
      <span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
        @click="
          () =>
            parent.$router.push({ path: item.path, query: parent.$route.query })
        "
      >
        <a-icon
          v-if="props.menuInfo.meta.icon"
          :type="props.menuInfo.meta.icon"
        ></a-icon>
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script type="text/javascript">
export default {
  props: ["menuInfo"]
};
</script>

<style lang="less" scoped></style>
