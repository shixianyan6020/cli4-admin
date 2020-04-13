<!--
 * @Description: 在界面中导出blob文件
 * @Author: sxy
 * @Date: 2020-04-08 17:55:06
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-09 14:51:09
 -->
<template>
  <div>
    <a-button @click="exportTable">导出表格</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    exportTable() {
      const config = {
        name: "lsqy",
        password: "yourpassword",
        ak: "XXXXXXXXXX",
        sk: "XXXXXXXXXX"
      };

      const blobContent = new Blob([JSON.stringify(config, null, 2)], {
        type: "application/json"
      });

      const blobUrl = window.URL.createObjectURL(blobContent);

      this.downloadFileByBlob(blobUrl, "config.json");
    },
    downloadFileByBlob(blobUrl, filename) {
      const eleLink = document.createElement("a");
      eleLink.download = filename;
      eleLink.style.display = "none";
      eleLink.href = blobUrl;
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    }
  }
};
</script>

<style lang="less" scoped></style>
