import Vue from "vue";
const state = {
  online: {},
  alarm: {}
};

const mutations = {
  tagChanged(state, payload) {
    console.log(payload);
    Vue.set(state.online, payload.target, payload.message);
    //state.online[payload.target] = { message: payload.message }();
  }
};

const actions = {};

const getters = {
  getOnlineValue: state => {
    return state.online;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
