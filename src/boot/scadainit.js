// import something here
import Vue from "vue";
import { ScadaClient } from "./scada.js";
export var has = function(obj, key) {
  return key.split(".").every(function(x) {
    if (typeof obj != "object" || obj === null || !x in obj) return false;
    obj = obj[x];
    return true;
  });
};

export var alarmstatus = function(value) {
  switch (value) {
    case 0:
      return "WAITING";
    case 1:
      return "SHELVED";
    case 2:
      return "TAKEN";
    case 3:
      return "ENDED";
    case 4:
      return "DEAD";
  }
};
export const bus = new Vue();
export var client = new ScadaClient(bus);

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async () => {};
