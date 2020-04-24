<!--
 * @Author: sxy
 * @Date: 2020-04-13 19:27:50
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-23 13:46:35
 * @Description:
 -->
<template>
  <div class="demo">
    <button @click="print">打印</button>
    <a-button type="primary" @click="selectPrint">选择打印机</a-button>
    <a-select style="width: 300px" @change="handleChange">
      <a-select-option :key="index" :value="item.ind" v-for="(item,index) in printerData">{{item.label}}</a-select-option>
    </a-select>
    <!-- <form id="form1" v-show="isshow">
      <table border="1" width="300" id="tb01">
        <tr>
          <td width="133" id="mtb001">
            <h2 style="background:pink;">我是表头</h2>
          </td>
        </tr>
      </table>
      <table border="1" width="300" height="106" cellspacing="0">
        <tr>
          <td>姓名</td>
          <td>年龄</td>
          <td>性别</td>
        </tr>
        <tr>
          <td>张三</td>
          <td>22</td>
          <td>女</td>
        </tr>
      </table>
    </form>-->
  </div>
</template>

<script>
import getLodop from "./LodopFuncs";

export default {
  data() {
    return {
      isshow: true,
      printerData: [],
      selectVal: '',
    };
  },
  mounted() {
    this.getPrinterData(); // 初始化获取打印机的列表(记录一下这个我一直没搞懂的问题，注意在这个地方一般是请求不到打印机的类表的，因为打印机是异步加载的时候显示的，我们可以在点击下拉列表的时候动态的的去加载打印机列表)
  },
  methods: {
    selectPrint() {
      this.getPrinterData()
    },
    handleChange(value) {
      this.selectVal = value;
      // console.log(`selected ${value}`);
    },
    getPrinterData() {
      let lodop = getLodop();
      let len = lodop.GET_PRINTER_COUNT();
      for (let i = 0; i < len; i++) {
        let p = {};
        p.label = lodop.GET_PRINTER_NAME(i);
        p.value = i;
        p.ind = i;
        this.printerData.push(p);
      }
      // console.log(this.printerData);
    },
    // 查询数据
    // printPdf() {
    //   let LODOP = getLodop();
    //   LODOP.PRINT_INIT("采购单");
    //   LODOP.SET_PRINT_STYLE("FontSize", 18);
    //   LODOP.SET_PRINT_STYLE("Bold", 1);
    //   LODOP.ADD_PRINT_TEXT(50, 300, 260, 39, "采购单");
    //   LODOP.ADD_PRINT_HTM(
    //     88,
    //     200,
    //     350,
    //     600,
    //     document.getElementById("form1").innerHTML
    //   );
    //   LODOP.PRINT();
    //   // LODOP.PREVIEW();
    // },
    print() {
      this.CreateOneFormPage(1);
      // LODOP.PREVIEW();
      LODOP.PRINT();
    },
    CreateOneFormPage(type) {
      LODOP = getLodop();
      LODOP.PRINT_INIT("货品打码");
      LODOP.SET_PRINT_PAGESIZE(1, 500, 300); //设置打印大小
      LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
      if (type === 1) {
        // 条形码
        LODOP.ADD_PRINT_BARCODE("2.65mm", "4mm", "49.3mm", "11mm", "128B", "1219201");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);//设置条码下方的文字相对于条码本身居中
        LODOP.ADD_PRINT_TEXT("15.5mm", "4mm", "45mm", '2mm', "货品名称：哈哈哈");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
        LODOP.ADD_PRINT_TEXT("19.5mm", "4mm", "45mm", '2mm', "货品名称：哈哈哈");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
        LODOP.ADD_PRINT_TEXT("23.5mm", "4mm", "45mm", '2mm', "货品名称：哈哈哈");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
        LODOP.SET_PRINTER_INDEX(this.selectVal);
      }
    },
  }
};
</script>