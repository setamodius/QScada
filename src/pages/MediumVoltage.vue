<template>
  <q-page padding class="flex">
    <q-card style="flex:1">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker :lat-lng="[36.134014, 33.231721]" />
      </l-map>
    </q-card>
  </q-page>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import { latLng, icon } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
export default {
  name: "MediumVoltage",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  data() {
    return {
      zoom: 15,
      center: L.latLng(36.134014, 33.231721),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        'sad &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icon: icon({
        iconUrl: "https://www.w3schools.com/html/pic_trulli.jpg",
        iconSize: [32, 37],
        iconAnchor: [16, 37]
      })
    };
  }
};
</script>

<style scoped></style>
