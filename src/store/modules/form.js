/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-26 11:56:53
 * @LastEditors: sxy
 * @LastEditTime: 2020-03-27 10:13:23
 */
import router from "../../router";
import request from "../../utils/request";

const state = {
  step: {
    payAccount: "123456",
    receiverAccount: {
      type: "alipay",
      number: ""
    }
  }
};

const actions = {
  async submitStepForm({ commit }, { payload }) {
    await request({
      url: "/api/forms",
      method: "POST",
      data: payload
    });
    commit("saveStepFormData", { payload });
    router.push("/form/step-form/result");
  }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
