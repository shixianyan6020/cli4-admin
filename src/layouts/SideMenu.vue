<!--
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 18:47:31
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-23 20:27:11
 -->
<template>
  <div style="width: 256px">
    <!-- selectedKeys(v-model)	当前选中的菜单项 key 数组 -->
    <!-- openKeys(.sync)	当前展开的 SubMenu 菜单项 key 数组 -->
    <!-- 路由中根据key值这个唯一标识来定位跳转的某一个路由 -->
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuDate">
        <!-- 只有一级没有子节点的情况下展示 -->
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <!-- 存在分层的情况下 -->
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import { check } from "../utils/auth";
export default {
  components: {
    "sub-menu": SubMenu
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuDate = this.getMenuDate(this.$router.options.routes);
    return {
      collapsed: false,
      // 存放侧边栏的路由
      menuDate,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuDate(routers = [], parentKeys = [], selectedKeys) {
      console.log(routers)
      const menuDate = [];
      for (let item of routers) {
        // 通过权限控制，是否在侧边栏显示路由
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          // 未通过权限验证的时候
          break;
        }
        if (item.name && !item.hideInMenu) { // 存在name字段并且 item.hideInMenu为false时候显示
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKeys || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) { // 存在子路由 并且item.hideChildrenInMenu为false 时候显示在侧边栏
            newItem.children = this.getMenuDate(item.children, [
              ...parentKeys,
              item.path
            ]);
          } else {
            this.getMenuDate(
              item.children,
              parentKeys ? parentKeys : [...parentKeys, item.path],
              selectedKeys || item.path
            );
          }
          menuDate.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuDate.push(
            ...this.getMenuDate(item.children, [...parentKeys, item.path])
          );
        }
      }
      console.log(menuDate);
      return menuDate;
    }
  }
};
</script>
<style lang="less" scoped></style>
