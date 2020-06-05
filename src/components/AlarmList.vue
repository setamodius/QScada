<template>
  <div class="q-pa-none">
    <q-table
      card-class="bg-gray-7 text-red glossy"
      table-class="text-grey-2"
      dense
      title=""
      :data="data"
      :columns="columns"
      row-key="name"
      dark
      color="blue"
    >
    </q-table>
  </div>
</template>
<script>
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
          format: val => `${val}`,
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
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          align: "right",
          sortable: true
        }
      ],
      data: [
        {
          start: "2012-04-23T18:25:43.511Z",
          systemname: "Ventilation",
          devicename: "JF1",
          location: "T5",
          message: "General Fault",
          ackdate: "2012-04-23T18:25:43.511Z",
          ackby: "Master User",
          enddate: "2012-04-23T18:25:43.511Z",
          status: "TAKEN"
        },
        {
          start: "2012-05-23T18:25:43.511Z",
          systemname: "Lighting",
          devicename: "Luminance1",
          location: "T5",
          message: "No Energy",
          ackdate: "2012-04-23T18:25:43.511Z",
          ackby: "Master User",
          enddate: "2012-04-23T18:25:43.511Z",
          status: "WAITING"
        }
      ]
    };
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
