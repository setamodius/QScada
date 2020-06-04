import Vue from "vue";
import Vuex from "vuex";
import { bus } from "../boot/scadainit";
import { client } from "../boot/scadainit";
import auth from "./store-auth";
import { Loading, QSpinnerGears } from "quasar";
import { Notify } from "quasar";

Vue.use(Vuex);
let getcurrentuser;
const authPlugin = Store => {
  bus.$on("WorkerStatusChanged", data => {
    console.log("status changed" + data);
    Store.commit("auth/updateStatus", data.isconnected);
    Store.commit("auth/updateConnectingStatus", false);
    Loading.hide();
    if (data.isconnected) {
      getcurrentuser = client.callrpc(
        "Access",
        "GetUser",
        JSON.stringify({ Username: client.options.username })
      );
      Notify.create({
        message: "Connected to server",
        color: "green"
      });
    } else {
      Notify.create({
        message: "Disconnected from server",
        color: "red"
      });
    }
  });
  bus.$on("RpcResult", data => {
    if (data.uid === getcurrentuser) {
      if (data.message.Fullname !== undefined) {
        Store.commit("auth/loginSuccess", data);
        data.message.Fullname;
      }
    }
  });
  bus.$on("ErrorReceived", error => {
    Notify.create({
      message: error.error,
      color: "red"
    });
  });

  Store.subscribe(mutation => {
    if (mutation.type === "auth/login") {
      client.connect(
        mutation.payload.Server,
        mutation.payload.Username,
        mutation.payload.Password
      );
      Store.commit("auth/updateConnectingStatus", true);
      Loading.show();
    }
  });
};

export default function() {
  const Store = new Vuex.Store({
    modules: {
      auth
    },
    plugins: [authPlugin],
    strict: process.env.DEV
  });
  return Store;
}
