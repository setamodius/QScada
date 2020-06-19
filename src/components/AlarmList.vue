<template>
  <div v-if="getAlarmList.length">
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
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <div
              :class="
                props.row.priority == 5
                  ? 'priority-5'
                  : props.row.priority == 4
                  ? 'priority-4'
                  : props.row.priority == 3
                  ? 'priority-3'
                  : props.row.priority == 2
                  ? 'priority-2'
                  : props.row.priority == 1
                  ? 'priority-1'
                  : 'text-white'
              "
            >
              {{ props.value }}
            </div>
          </q-td>
        </template>
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Alarm List</div>

          <q-space />

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

    <div v-if="!isAlarmListOpen" class="row priority-bg-2">
      <q-bar v-if="firstAlarm" class=" ">
        <q-btn class="glossy" icon="notifications" label="ACK" />
        <div class="q-px-md">{{ firstAlarm.start }}</div>
        <div class="q-px-md">{{ firstAlarm.systemname }}</div>
        <div class="q-px-md">{{ firstAlarm.location }}</div>
        <div class="q-px-md">{{ firstAlarm.devicename }}</div>
        <div class="q-px-md">{{ firstAlarm.message }}</div>
        <q-space />
      </q-bar>

      <q-btn
        v-if="!isAlarmListOpen"
        color="secondary"
        icon="list"
        class="glossy absolute-bottom-right q-ma-sm"
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
          name: "priority",
          label: "Priority",
          field: "priority",
          align: "center",
          sortable: true
        },
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
    ...mapGetters("scadadata", ["getAlarmList"]),
    firstAlarm: function() {
      if (this.getAlarmList[0] === undefined) {
        return null;
      } else {
        console.log(
          this.getAlarmList
            .filter(item => item.status == 0)
            .sort(function(a, b) {
              return a.priority - b.priority;
            })
        );
        return this.getAlarmList
          .filter(item => item.status == 0)
          .sort(function(a, b) {
            return a.priority - b.priortiy;
          })[0];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes example {
  0% {
    color: red;
  }

  100% {
    color: darkred;
  }
}

.priority-bg-1 {
  background-color: $priority-bg-color-1;
}

.priority-bg-2 {
  background-color: $priority-bg-color-2;
}

.priority-bg-3 {
  background-color: $priority-bg-color-3;
}

.priority-bg-4 {
  background-color: $priority-bg-color-4;
}

.priority-bg-5 {
  background-color: $priority-bg-color-5;
}

.priority-1 {
  color: $priority-color-1;
}
.priority-2 {
  color: $priority-color-2;
}
.priority-3 {
  color: $priority-color-3;
}
.priority-4 {
  color: $priority-color-4;
}
.priority-5 {
  color: $priority-color-5;
  font-weight: bold;
  animation-name: example;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>
