import Vue from "vue";
const state = {
  online: {},
  alarmlist: [],
  virtualdevices: {}
};

const mutations = {
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
  },
  AlarmReceived(state, payload) {
    if (state.alarmlist.some(item => item.id == payload.id)) {
      state.alarmlist = state.alarmlist.map(item => {
        if (item.id === payload.id) {
          return Object.assign({}, item, payload);
        }
        return item;
      });
    } else {
      state.alarmlist.push(payload);
    }
  }
};

const actions = {};

const getters = {
  getOnlineValue: state => {
    return state.online;
  },

  bindToVD: state => address => {
    return state.virtualdevices[address];
  },
  getAlarmList: state => {
    return state.alarmlist;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
