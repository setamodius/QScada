<template>
  <q-page class="standartbackcolor">
    <div class="main-container ">
      <div class=" main-item main-top  ">
        <h4>
          T4 TUNNEL
        </h4>
      </div>
      <div class="tunnel-container main-item main-middle ">
        <div
          class="tunnel-item tunnel-item-road"
          style="background-color:#2D2C31"
        >
          <svg width="100%" height="100%">
            <line
              x1="0"
              y1="2%"
              x2="100%"
              y2="2%"
              style="stroke-width:4;stroke:yellow"
            />
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              style="stroke-width:4;stroke:white"
            />
            <line
              x1="0"
              y1="98%"
              x2="100%"
              y2="98%"
              style="stroke-width:4;stroke:yellow"
            />
          </svg>
        </div>
        <div
          class="tunnel-item tunnel-item-tunnel"
          style="background-color:rgba(255,255,255,.3);"
        ></div>
        <div class="tunnel-item tunnel-item-11 mystyle">
          <jetfan
            fanname="JF1"
            :virtualdevice="bindToVD('MATP/Ventilation/Jetfan/T4KJF01')"
          ></jetfan>
        </div>
        <div class="tunnel-item tunnel-item-12 mystyle">
          <jetfan
            fanname="JF2"
            :virtualdevice="bindToVD('MATP/Ventilation/Jetfan/T4KJF02')"
          ></jetfan>
        </div>
        <div class="tunnel-item tunnel-item-13 mystyle">
          <jetfan
            fanname="JF3"
            :virtualdevice="bindToVD('MATP/Ventilation/Jetfan/T4KJF03')"
          ></jetfan>
        </div>
        <div class="tunnel-item tunnel-item-14 mystyle">
          <jetfan
            fanname="JF4"
            :virtualdevice="bindToVD('MATP/Ventilation/Jetfan/T4KJF04')"
          ></jetfan>
        </div>
        <div class="tunnel-item tunnel-item-21 mystyle">
          <jetfan
            fanname="JF5"
            :virtualdevice="bindToVD('MATP/Ventilation/Jetfan/T4KJF05')"
          ></jetfan>
        </div>
        <div class="tunnel-item tunnel-item-22 mystyle">
          <jetfan
            fanname="JF6"
            :virtualdevice="bindToVD('MATP/Ventilation/Jetfan/T4KJF06')"
          ></jetfan>
        </div>
        <div class="tunnel-item tunnel-item-23 mystyle">
          <jetfan
            fanname="JF7"
            :virtualdevice="bindToVD('MATP/Ventilation/Jetfan/T4KJF07')"
          ></jetfan>
        </div>
        <div class="tunnel-item tunnel-item-24 mystyle">
          <jetfan
            fanname="JF8"
            :virtualdevice="bindToVD('MATP/Ventilation/Jetfan/T4KJF08')"
          ></jetfan>
        </div>
      </div>

      <div
        class="main-item main-bottom  row q-col-gutter-xs justify-end q-mt-sm"
      >
        <div class="col-2">
          <div class="bg-grey-6">
            <div class="bg-dark text-white text-center">Karbonmonoksit</div>
            <div class="bg-green-2 q-ma-xs text-center">- PPM</div>
          </div>
        </div>
        <div class="col-2">
          <div class="bg-grey-6">
            <div class="bg-dark text-white text-center">Toz Partikül</div>
            <div class="bg-green-2 q-ma-xs text-center">- M</div>
          </div>
        </div>
        <div class="col-2">
          <div class="bg-grey-6">
            <div class="bg-dark text-white text-center">Hava Akış Hızı</div>
            <div class="bg-green-2 q-ma-xs text-center">- m/sn</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Ventilation",
  data() {
    return {
      control: "auto"
    };
  },
  components: {
    jetfan: require("components/Jetfan").default
  },
  computed: {
    ...mapGetters("scadadata", ["getOnlineValue", "bindToTarget", "bindToVD"])
  }
};
</script>

<style scoped>
.standartbackcolor {
  background-color: #1a1a1a;
}
.main-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 2fr auto 1fr;
  justify-items: stretch;
  align-items: stretch;
}
.main-item {
  border: 0px solid;
}
.main-top {
  display: grid;
  grid-column: 1/4;
  justify-items: center;
  align-items: center;
}
.main-middle {
  grid-column: 1/4;
}
.main-bottom {
  grid-column: 1/4;
}
.tunnel-container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2fr;
  grid-template-rows: 1fr 1fr;
}
.tunnel-item {
  display: grid;
  border: 0px solid #eee;
  justify-items: center;
  align-items: center;
}
.tunnel-item-road {
  grid-column: 1/7;
  grid-row: 1/3;
}
.tunnel-item-tunnel {
  grid-column: 2/6;
  grid-row: 1/3;
}

.tunnel-item-11 {
  grid-column: 2/3;
  grid-row: 1/2;
}
.tunnel-item-12 {
  grid-column: 3/4;
  grid-row: 1/2;
}
.tunnel-item-13 {
  grid-column: 4/5;
  grid-row: 1/2;
}
.tunnel-item-14 {
  grid-column: 5/6;
  grid-row: 1/2;
}
.tunnel-item-21 {
  grid-column: 2/3;
  grid-row: 2/3;
}
.tunnel-item-22 {
  grid-column: 3/4;
  grid-row: 2/3;
}
.tunnel-item-23 {
  grid-column: 4/5;
  grid-row: 2/3;
}
.tunnel-item-24 {
  grid-column: 5/6;
  grid-row: 2/3;
}
.mystyle {
  margin: 0%;
}
</style>
