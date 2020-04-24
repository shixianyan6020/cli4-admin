/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-21 17:11:43
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-23 12:01:09
 */

//  在 https://github.com/mzohaibqc/antd-theme-webpack-plugin  复制过来下面这一个配置 这段代码主要是为了定制主题色
const path = require('path');
const webpack = require("webpack");
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src"),
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ),
  mainLessFile: "",
  themeVariables: ["@primary-color"],
  generateOnce: false
}
const themePlugin = new AntDesignThemePlugin(options); // 把这个主题添加到下面的配置中


module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A', // 自定义设置主题样色
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),],
    resolve: { // 配置图标的按需加载
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
      }
    }
  },
  // 配置svg
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  devServer: {
    proxy: {
      // 接口代理
      "/api": {
        target: "http://localhost:8080/", // 代理接口
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)]; // 清理缓存
            return res.send(result);
          }
        }
      }
    }
  }
};
