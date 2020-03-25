<!--
 * @Description: 本页面主要控制用户的权限 本页面是一个函数式组件,把这个组件注册为一个全局的组件
 * @Author: sxy
 * @Date: 2020-03-23 15:20:33
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-23 16:21:30
 -->

<script type="text/javascript">
import { check } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>

<style lang="less" scoped></style>
