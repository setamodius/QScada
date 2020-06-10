import Vue from "vue";
const state = {
  online: {},
  alarm: {},
  virtualdevices: {}
};

const mutations = {
  tagChanged(state, payload) {
    Vue.set(state.online, payload.target, payload.message);
  },
  VDChanged(state, payload) {
    //state.virtualdevices[payload.virtualdevice][payload.property] =
    //  payload.message;
    if (state.virtualdevices[payload.virtualdevice] === undefined) {
      Vue.set(state.virtualdevices, payload.virtualdevice, {});
    }

    if (
      state.virtualdevices[payload.virtualdevice][payload.property] ===
      undefined
    ) {
      Vue.set(
        state.virtualdevices[payload.virtualdevice],
        payload.property,
        {}
      );
    }
    Vue.set(
      state.virtualdevices[payload.virtualdevice],
      payload.property,
      payload.message
    );

    //state.virtualdevices.push(payload.virtualdevice);
  }
};

const actions = {};

const getters = {
  getOnlineValue: state => {
    return state.online;
  },
  bindToTarget: state => name => {
    if (state.online[name] == undefined) {
      console.log(name + " not ready");
      return { Value: "" };
    }
    console.log(state.online[name]);
    return state.online[name];
  },

  bindToVD: state => address => {
    console.log(state.virtualdevices[address]);
    return state.virtualdevices[address];
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
