/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-21 17:11:43
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-24 14:48:54
 */
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
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
