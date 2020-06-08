const state = {
  allData: []
};

const mutations = {
  updateStatus(state, payload) {
    console.log(payload);
    state.isConnected = payload;
  },
  updateConnectingStatus(state, payload) {
    state.isConnecting = payload;
  },
  loginSuccess(state, payload) {
    state.currentUserFullname = payload.message.Fullname;
    state.currentUsername = payload.message.Username;
  },
  login(state, payload) {}
};

const actions = {
  updateStatus({ commit }, payload) {
    commit("updateStatus", payload);
  },
  login({ commit }, payload) {
    commit("login", payload);
  }
};

const getters = {
  isConnected: state => {
    return state.isConnected;
  },
  isDisconnected: state => {
    return !state.isConnected;
  },
  CurrentUser: state => {
    return state.currentUsername;
  },
  CurrentUserFullname: state => {
    return state.currentUserFullname;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
