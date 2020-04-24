/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 10:02:02
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-23 13:42:43
 */

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
let plugins = [
  [
    "import",
    {
      libraryName: "ant-design-vue",
      libraryDirectory: "es",
      style: true
    }
  ]
];
if (IS_PROD) {
  plugins.push("transform-remove-console");
}
module.exports = {
  presets: ["@vue/app", "@vue/babel-preset-jsx"],
  plugins: plugins
};
