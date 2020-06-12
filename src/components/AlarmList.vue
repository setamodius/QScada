<template>
  <div>
    <div class="q-pa-none">
      <q-table
        v-if="isAlarmListOpen"
        card-class=" text-white "
        table-class="text-grey-2"
        dense
        title="Alarm List"
        :data="getAlarmList"
        :columns="columns"
        row-key="id"
        dark
        color="blue"
        selection="multiple"
        :selected.sync="selected"
      >
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Alarm List</div>

          <q-space />

          <div class="col"></div>

          <q-btn
            <q-btn
            v-if="isAlarmListOpen"
            size="sm"
            color="secondary"
            icon="arrow_drop_down"
            class="glossy q-pa-none"
            @click="isAlarmListOpen = !isAlarmListOpen"
          />
        </template>
      </q-table>
    </div>

    <div class="row">
      <q-btn
        v-if="!isAlarmListOpen"
        color="negative"
        icon="notifications"
        class="glossy absolute-bottom-right "
        round
        @click="isAlarmListOpen = !isAlarmListOpen"
      />
    </div>
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
      isAlarmListOpen: false,
      selected: [],
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
