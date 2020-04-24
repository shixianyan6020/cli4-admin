<!--
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 19:05:18
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-23 11:25:44
 -->
<template>
  <div>
   {{ $t("message")["app.dashboard.analysis.timeLabel"] }} :
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" style="height: 400px"></Chart>
  </div>
</template>

 <script type="text/javascript">
import Chart from "../../components/Chart";
import random from "lodash/random"; // 生成随机数
import request from "../../utils/request";
// import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      interval: "",
      chartOption: {}
    };
  },
  components: {
    Chart
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100)
      );
      // 如果组件里你木有写深度监听，下面这句话你就老老实实写上，甭管什么意思，写就完了
      this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        methods: "GET",
        params: { ID: "12345" }
      }).then(res => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: res.data
            }
          ]
        };
      });
      // axios
      //   .get("/api/dashboard/chart", { params: { ID: "12345" } })
      //   .then(res => {
      //     this.chartOption = {
      //       title: {
      //         text: "ECharts 入门示例"
      //       },
      //       tooltip: {},
      //       xAxis: {
      //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      //       },
      //       yAxis: {},
      //       series: [
      //         {
      //           name: "销量",
      //           type: "bar",
      //           data: res.data
      //         }
      //       ]
      //     };
      //   });
    }
  },
  beforeDestroy() {
    this.interval();
  }
};
</script>

<style lang="less" scoped></style>
