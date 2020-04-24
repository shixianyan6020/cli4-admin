/*
 * @Author: sxy
 * @Date: 2020-03-21 17:11:44
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-23 14:07:53
 * @Description: 这个文件主要用来做单元测试使用
 */

module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"],
  testURL: "http://localhost/",
  collectCoverage: process.env.COVERAGE === "true",
  collectCoverageFrom: ["src/**/*.{js,vue}", "!**/node_modules/**"]
};