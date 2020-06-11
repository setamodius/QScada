<template>
  <div class="q-pa-none">
    <q-table
      card-class="bg-gray-7 text-red glossy"
      table-class="text-grey-2"
      dense
      title=""
      :data="getAlarmList"
      :columns="columns"
      row-key="name"
      dark
      color="blue"
    >
    </q-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
import { alarmstatus } from "../boot/scadainit";
export default {
  name: "AlarmList",

  props: {
    msg: String
  },
  data() {
    return {
      columns: [
        {
          name: "start",
          required: true,
          label: "Start",
          align: "left",
          field: "start",
          format: val => `${date.formatDate(val, "DD-MM-YYYY HH:mm:ss")}`,
          sortable: true
        },
        {
          name: "systemname",
          align: "left",
          label: "System Name",
          field: "systemname",
          sortable: true
        },
        {
          name: "devicename",
          label: "Device Name",
          field: "devicename",
          align: "left",
          sortable: true
        },
        {
          name: "location",
          label: "Location",
          field: "location",
          align: "left",
          sortable: true
        },
        {
          name: "message",
          label: "Message",
          field: "message",
          align: "left",
          sortable: true
        },
        {
          name: "ackdate",
          label: "Acknowledge Date",
          field: "ackdate",
          align: "left",
          format: val => `${date.formatDate(val, "DD-MM-YYYY HH:mm:ss")}`,
          sortable: true
        },
        {
          name: "ackby",
          label: "Acknowledge By",
          field: "ackby",
          align: "left",
          sortable: true
        },
        {
          name: "enddate",
          label: "End Date",
          field: "enddate",
          align: "left",
          format: val => `${date.formatDate(val, "DD-MM-YYYY HH:mm:ss")}`,
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          align: "right",
          format: val => `${alarmstatus(val)}`,
          sortable: true
        }
      ]
    };
  },
  components: {},

  computed: {
    ...mapGetters("scadadata", ["getAlarmList"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
