<template>
  <q-page>
    <div class="q-pa-none">
      <div>
        <q-card>
          <q-tabs v-model="tab" dense align="justify" narrow-indicator>
            <q-tab name="virtualdevices" label="Virtual Devices" />
            <q-tab name="projectree" label="Project Tree" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="virtualdevices" class="q-pa-none">
              <virtualdevicelist></virtualdevicelist>
            </q-tab-panel>

            <q-tab-panel name="projectree">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { bus } from "../boot/scadainit";
import { client } from "../boot/scadainit";
export default {
  name: "ProjectManagement",
  components: {
    virtualdevicelist: require("components/VirtualDeviceList").default
  },

  data() {
    return {
      tab: "virtualdevices"
    };
  }
};
</script>

<style scoped></style>
