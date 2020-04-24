/*
 * @Author: sxy
 * @Date: 2020-03-21 17:11:44
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-23 14:06:57
 * @Description:
 */
module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ["plugin:vue/essential"], // "@vue/prettier"
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};