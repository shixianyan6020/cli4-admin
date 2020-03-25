/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 10:02:02
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-24 16:08:22
 */
module.exports = {
  presets: ["@vue/app", "@vue/babel-preset-jsx"],
  plugins: [
    // 这个配置的目的是为了按需引入插件
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: true
      }
    ] // `style: true` 会加载 less 文件
  ]
};
