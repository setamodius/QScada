<template>
  <div class="jetfan-container ">
    <div class="jetfan-item jetfan-title ">
      <div style="text-shadow: 1px 1px #000;">
        <b>{{ fanname }}</b>
      </div>
    </div>
    <div class="jetfan-item jetfan-left-arrow">
      <svg width="1vw" viewBox="0 0 640 640" class="runcolor">
        <path d="M153.581 320L486.42 640.012V-.012L153.581 320z" />
      </svg>
    </div>
    <div class="jetfan-item jetfan-right-arrow">
      <svg width="1vw" viewBox="0 0 640 640" class="runcolor">
        <path d="M486.419 320L153.58 640.012V-.012L486.419 320z" />
      </svg>
    </div>
    <div>
      <svg
        viewBox="-1.3 -.3 38.3 13.8"
        width="100%"
        class="jetfan-item jetfan-middle"
      >
        <path
          d="M 0,0 C -1.3229167,5.2916667 -1.3229167,9.2604167 0,13.229167 H 6.6145833 L 10.583333,11.90625 h 14.552084 l 3.96875,1.322917 H 35.71875 C 37.041667,9.2604167 37.041667,3.96875 35.71875,0 h -6.614583 l -3.96875,1.3229167 H 10.583333 L 6.6145833,0 Z"
          style="fill:url(#linearGradient1912);stroke-linejoin:bevel;stroke-width:.26458px;stroke:#000"
        />
        <path
          class="runcolor"
          d="m 6.6145833,0 3.9687507,1.322917 c -1.3229174,2.645833 -1.3229174,6.614583 0,10.583333 L 6.6145833,13.229167 C 5.291667,9.260417 5.291667,3.96875 6.6145833,0 Z"
          style="stroke-linejoin:round;stroke-width:.26458px;stroke:#000"
        />
        <path
          class="runcolor"
          d="m 25.135417,1.322916 c 1.322917,2.645834 1.322917,6.614584 0,10.583335 l 3.96875,1.322917 C 30.427084,9.260416 30.427084,3.96875 29.104167,0 Z"
          style="stroke-linejoin:round;stroke-width:.26458px;stroke:#000"
        />
        <path
          class="runcolor"
          d="m 18.520835,2.6458332 v 2.6458333 h 3.96875 v 2.6458333 h -3.96875 V 10.583333 L 13.229169,6.6145832 Z"
          style="stroke-linejoin:round;stroke-width:.26458px;stroke:#000"
        />
        <path
          class="runcolor"
          d="m 18.520835,2.6458333 3.96875,3.96875 -3.96875,3.9687497 0,-2.645833 -5.291666,-2e-7 V 5.2916665 l 5.291666,2e-7 z"
          style="stroke-linejoin:round;stroke-width:.26458px;stroke:#000"
        />
        <g>
          <path
            class="idlecolor"
            d="M 17.197919,2.6458332 V 10.583333 H 14.552085 V 2.6458332 Z"
            style="stroke-linejoin:round;stroke-width:.26458px;stroke:#000"
          />
          <path
            class="idlecolor"
            d="m 18.520835,2.6458332 v 7.9374998 h 2.645834 V 2.6458332 Z"
            style="stroke-linejoin:round;stroke-width:.26458px;stroke:#000"
          />
        </g>
        <path
          v-if="isError"
          class="errorcolor"
          d="m 14.552085,2.6458332 h 6.614584 v 7.9374998 h -6.614584 z"
          style="stroke-linejoin:round;stroke-width:.26458px;stroke:#000"
        />
        <defs>
          <linearGradient
            id="linearGradient1912"
            x1="0"
            x2="0"
            y1="35"
            y2="105"
            gradientTransform="translate(0, -45)"
            gradientUnits="userSpaceOnUse"
          >
            <stop style="stop-color:#111" offset="0" />
            <stop style="stop-color:#857a7a" offset=".3" />
            <stop style="stop-color:#646464" offset=".6" />
            <stop style="stop-color:#111" offset="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="jetfan-item jetfan-bottom ">
      <div style="text-shadow: 1px 1px #000;" class="runtime">1s 30d 24s</div>
    </div>
  </div>
</template>
<script>
import VueDraggableResizable from "vue-draggable-resizable";

export default {
  name: "jetfan",
  props: {
    fanname: String,
    isError: Boolean
  },
  data: function() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    };
  },
  methods: {
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jetfan-container {
  display: grid;
  grid-template-columns: 1vw 4vw 1vw;
  grid-template-rows: auto auto auto;
}
.jetfan-item {
  padding: 0px;
}

.jetfan-title {
  grid-column: 1/4;
  grid-row: 1/2;
  display: grid;

  justify-items: center;
  align-items: center;
}

.jetfan-left-arrow {
  grid-column: 1/2;
  grid-row: 1/4;
  display: grid;
  justify-items: center;

  align-items: center;
}
.jetfan-right-arrow {
  grid-column: 3/4;
  grid-row: 1/4;
  display: grid;
  justify-items: center;
  align-items: center;
}
.jetfan-middle {
  grid-column: 2/3;
  grid-row: 2/3;
  display: grid;
  justify-items: center;
  align-items: center;
}
.jetfan-bottom {
  grid-column: 1/4;
  grid-row: 3/4;
  display: grid;

  justify-items: center;
  align-items: center;
}

.runcolor {
  fill: lime;
}
.idlecolor {
  fill: yellow;
}
.errorcolor {
  fill: red;
}
.red {
  background-color: red;
}
@keyframes hideshow {
  0% {
    opacity: 1;
  }
  10% {
    opacity: 1;
  }
  15% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.running {
  transform-origin: 20% 48%;
}
.running:hover {
  transform: rotate(360deg);

  transition-duration: 1s;
}
</style>
