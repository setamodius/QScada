<template>
  <div class="q-pa-none">
    <q-table
      :data="virtualdevices"
      :columns="columns"
      row-key="name"
      selection="single"
      :pagination.sync="pagination"
      dense
    />

    <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { bus } from "../boot/scadainit";
import { client } from "../boot/scadainit";
export default {
  name: "VirtualDeviceList",

  props: {
    msg: String
  },
  data() {
    return {
      rpcgetvirtualdevices: "",
      rpcgetvirtualdevice: "",
      virtualdevices: [],
      deviceproperties: [],
      devicealarms: [],
      devicecommands: [],
      myvalue: "",
      selected: "",
      pagination: {
        rowsPerPage: 20
      },
      columns: [
        {
          name: "desc",
          required: true,
          label: "VirtualDevice Name",
          align: "left",
          field: row => row.Name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "alias",
          required: true,
          label: "VirtualDevice Alias",
          align: "left",
          field: row => row.Alias,
          format: val => `${val}`,
          sortable: true
        }
      ]
    };
  },
  components: {},
  methods: {
    refresh: function() {
      this.rpcgetvirtualdevices = client.callrpc(
        "Project",
        "GetAllVirtualDeviceNames",
        "{}"
      );
    },
    loadvirtualdevice: function() {
      this.rpcgetvirtualdevice = client.callrpc(
        "Project",
        "GetVirtualDevice",
        JSON.stringify(this.selected)
      );
    }
  },
  created: function() {
    this.refresh();
    bus.$on("RpcResult", data => {
      if (data.uid === this.rpcgetvirtualdevices) {
        let innerlist = [];
        for (var key in data.message) {
          innerlist.push(data.message[key]);
        }
        innerlist.sort((a, b) => a.Name.localeCompare(b.Name));
        this.virtualdevices = innerlist;
      }

      if (data.uid === this.rpcgetvirtualdevice) {
        let innerproperties = [];
        for (key in data.message.Properties) {
          innerproperties.push(data.message.Properties[key]);
        }
        innerproperties.sort((a, b) => a.Name.localeCompare(b.Name));
        this.deviceproperties = innerproperties;

        let inneralarms = [];
        for (key in data.message.Alarms) {
          inneralarms.push(data.message.Alarms[key]);
        }
        inneralarms.sort((a, b) => a.Name.localeCompare(b.Name));
        this.devicealarms = inneralarms;

        let innercommands = [];
        for (key in data.message.Commands) {
          innercommands.push(data.message.Commands[key]);
        }
        innercommands.sort((a, b) => a.Name.localeCompare(b.Name));
        this.devicecommands = innercommands;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
