<template>
  <q-page padding>
    <div class="text-h4 ">Dashboard {{ isDisconnected }}</div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters("auth", ["isDisconnected"])
  }
};
</script>

<style scoped></style>
