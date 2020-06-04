// import something here
import Vue from 'vue'
import {
  ScadaClient
} from './scada.js'
export const bus = new Vue()
export var client = new ScadaClient(bus)
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async () => {

}
