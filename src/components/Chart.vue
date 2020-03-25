<!--
 * @Description: 
 * @Author: sxy
 * @Date: 2020-03-23 17:06:20
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-23 18:51:38
 -->
<template>
  <div ref="chartDom"></div>
</template>

<script type="text/javascript">
import echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";
export default {
  data() {
    return {
      chart: ""
    };
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option(newVal) {
      this.chart.setOption(newVal);
    }
    // 深度监听
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true // 实现echart的深度监听
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    //一定得要在初始化的时候给它监听上，看它适应不适应
    addListener(this.$refs.chartDom, this.resize);
  },
  methods: {
    resize() {
      console.log("this resize"); // 为了防止执行一下多次执行这个函数，引入防抖函数
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
    }
  },
  beforeDestroy() {
    // 一定要在这个生命周期销毁，不然在销毁时找不到元素报错，不信你试试
    removeListener(this.$refs.chartDom, this.resize);
    if (this.chart.dispose) this.chart.dispose();
    this.chart = null;
  }
};
</script>

<style lang="less" scoped></style>
