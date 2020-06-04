<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import VueDraggableResizable from "vue-draggable-resizable";
Vue.component("vue-draggable-resizable", VueDraggableResizable);
export default {
  name: "App",
  created() {
    this.$q.dark.set(true);
  }
};
</script>
