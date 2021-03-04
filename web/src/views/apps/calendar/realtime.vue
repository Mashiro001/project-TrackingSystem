<template>
  <div>
    <vs-collapse>
      <vs-collapse-item not-arrow>
        <div slot="header">
          <div class="vx-row">
            <div class="vx-col w-1/2">
              <vs-button
                @click="active = !active"
                color="primary"
                icon="timeline"
                >Selected device</vs-button
              >
            </div>
            <div id="time" class="vx-col w-1/2">
              Refresh in: {{ countDown }} s
            </div>
          </div>
        </div>
        <div class="overlaytable">
          <vx-card>
            <vs-table
              max-items="5"
              pagination
              v-model="selected"
              @selected="setmarker"
              search
              :data="dataDeviceRealtime"
            >
              <template slot="thead">
                <vs-th>Details</vs-th>
                <vs-th sort-key="device_id">Device_ID</vs-th>
                <vs-th sort-key="device_name">Device name</vs-th>
                <vs-th sort-key="device_time">Device time</vs-th>
                <vs-th sort-key="receive_time">Received time</vs-th>
                <vs-th sort-key="speed">speed</vs-th>
                <vs-th sort-key="battery">Battery (%)</vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <div class="tooltip">
                    <vs-td>
                      <vs-chip size="small" color="primary">
                        Details
                      </vs-chip>
                      <div class="right">
                        <div class="con-expand-users w-full">
                          <vs-divider position="center"><h6><div class="titleID">Detail device ID: {{ data[indextr].device_id }}</div></h6></vs-divider>
                          <div class="flex items-center justify-between">
                            <div
                              class="con-userx flex items-center justify-start"
                            >
                              <vs-avatar color="primary" icon="location_on" />
                            </div>
                            <vs-col>
                              <vs-row>
                                <div class="text-primary">Latitude:</div>
                                <span>&nbsp;{{ data[indextr].lat }}</span
                                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <div class="text-primary">Longitude:</div>
                                <span>&nbsp;{{ data[indextr].lng }}</span>
                              </vs-row>
                              <!-- <vs-row>
                            <div class="text-primary">Longitude:</div>
                            <span>&nbsp;{{ data[indextr].lng }}</span>
                          </vs-row> -->
                              <vs-row>
                                <div class="text-primary">Location:</div>
                                <span
                                  >&nbsp;{{
                                    data[indextr].location.TAM_TNAME
                                  }},{{
                                    data[indextr].location.AMP_TNAME
                                  }}&nbsp;{{
                                    data[indextr].location.PROV_TNAME
                                  }}</span
                                >
                              </vs-row>
                            </vs-col>
                          </div>
                          <vs-divider></vs-divider>
                          <div class="flex items-center justify-between">
                            <div
                              class="con-userx flex items-center justify-start"
                            >
                              <vs-avatar color="#74cbeb" icon="speed" />
                            </div>
                            <vs-col>
                              <vs-row>
                                <div class="text-primary">
                                  Gps speed signal:
                                </div>
                                <span
                                  >&nbsp;{{ data[indextr].gps_signal }}&nbsp;
                                  KM/h</span
                                >
                              </vs-row>
                              <vs-row>
                                <div class="text-primary">Internet speed:</div>
                                <span
                                  >&nbsp;{{
                                    data[indextr].gsm_signal
                                  }}&nbsp;Mbps</span
                                >
                              </vs-row>
                            </vs-col>

                            <div
                              class="con-userx flex items-center justify-start"
                            >
                              <vs-avatar color="#BC1254" icon="sd_storage" />
                            </div>
                            <vs-col>
                              <vs-row>
                                <div class="text-primary">
                                  SD card free space:
                                </div>
                                <span
                                  >&nbsp;{{
                                    data[indextr].sdcard_free
                                  }}&nbsp;&nbsp;{{
                                    data[indextr].sdcard_free_unit
                                  }}</span
                                >
                              </vs-row>
                              <vs-row>
                                <div class="text-primary">
                                  Storage card free space:
                                </div>
                                <span
                                  >&nbsp;{{
                                    data[indextr].storage_free
                                  }}&nbsp;&nbsp;{{
                                    data[indextr].storage_free_unit
                                  }}</span
                                >
                              </vs-row>
                            </vs-col>
                          </div>
                        </div>
                      </div>
                    </vs-td>
                  </div>

                  <vs-td :data="data[indextr].device_id">
                    {{ data[indextr].device_id }}
                  </vs-td>

                  <vs-td :data="data[indextr].device_name">
                    {{ data[indextr].device_name }}
                  </vs-td>

                  <vs-td :data="data[indextr].device_time">
                    {{ data[indextr].device_time | moment }}
                  </vs-td>

                  <vs-td :data="data[indextr].receive_time">
                    <div
                      :class="{
                        'text-danger':
                          diff_minutes(data[indextr].receive_time) > 10
                      }"
                    >
                      {{ data[indextr].receive_time | moment }}
                    </div>
                  </vs-td>

                  <vs-td :data="data[indextr].speed">
                    {{ data[indextr].speed }}
                  </vs-td>

                  <vs-td>
                    <vs-chip
                      :color="getOrderStatusColor(data[indextr].battery)"
                      class="battery"
                      >{{ data[indextr].battery }}</vs-chip
                    >
                  </vs-td>

                  <!-- <template class="expand-user" slot="simple">
                    <div class="con-expand-users w-full">
                      <div class="flex items-center justify-between">
                        <div class="con-userx flex items-center justify-start">
                          <vs-avatar color="#74cbeb" icon="speed" />
                        </div>
                        <vs-col>
                          <vs-row>
                            <div class="text-primary">Gps speed signal:</div>
                            <span
                              >&nbsp;{{ data[indextr].gps_signal }}&nbsp;
                              KM/h</span
                            >
                          </vs-row>
                          <vs-row>
                            <div class="text-primary">Internet speed:</div>
                            <span
                              >&nbsp;{{
                                data[indextr].gsm_signal
                              }}&nbsp;Mbps</span
                            >
                          </vs-row>
                        </vs-col>

                        <div class="con-userx flex items-center justify-start">
                          <vs-avatar color="primary" icon="location_on" />
                        </div>
                        <vs-col>
                          <vs-row>
                            <div class="text-primary">Latitude:</div>
                            <span>&nbsp;{{ data[indextr].lat }}</span>
                          </vs-row>
                          <vs-row>
                            <div class="text-primary">Longitude:</div>
                            <span>&nbsp;{{ data[indextr].lng }}</span>
                          </vs-row>
                          <vs-row>
                            <div class="text-primary">Location:</div>
                            <span
                              >&nbsp;{{ data[indextr].location.TAM_TNAME }},{{
                                data[indextr].location.AMP_TNAME
                              }}&nbsp;{{
                                data[indextr].location.PROV_TNAME
                              }}</span
                            >
                          </vs-row>
                        </vs-col>
                      </div>
                      <vs-divider></vs-divider>
                      <div class="flex items-center justify-between">
                        <div class="con-userx flex items-center justify-start">
                          <vs-avatar color="#BC1254" icon="sd_storage" />
                        </div>
                        <vs-col>
                          <vs-row>
                            <div class="text-primary">SD card free space:</div>
                            <span
                              >&nbsp;{{
                                data[indextr].sdcard_free
                              }}&nbsp;&nbsp;{{
                                data[indextr].sdcard_free_unit
                              }}</span
                            >
                          </vs-row>
                          <vs-row>
                            <div class="text-primary">
                              Storage card free space:
                            </div>
                            <span
                              >&nbsp;{{
                                data[indextr].storage_free
                              }}&nbsp;&nbsp;{{
                                data[indextr].storage_free_unit
                              }}</span
                            >
                          </vs-row>
                        </vs-col>
                      </div>
                    </div>
                  </template> -->
                </vs-tr>
              </template>
            </vs-table>
          </vx-card>
        </div>
      </vs-collapse-item>
    </vs-collapse>
    <vx-card>
      <div id="mapidRealtime"></div>
    </vx-card>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import moment from "moment";

export default {
  data: () => ({
    api: "/getAllrealtime",
    active: false,
    popupActive: false,
    selected: [],
    dataDeviceRealtime: [],
    difred: false,
    countDown: 30
  }),
  name: "email",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    moment
  },
  mounted() {
    if (localStorage.getItem("userIDLogin") != undefined) {
      if (localStorage.getItem("deviceUserLogin") != undefined) {
        this.devicegetLogin = JSON.parse(
          localStorage.getItem("deviceUserLogin")
        );
        console.log(this.devicegetLogin);

        this.init();
        this.countDownTimer();
        this.mymap = L.map("mapidRealtime").setView(
          [13.676142, 100.6019176],
          13
        );
        L.tileLayer
          .wms(
            "https://www.deemap.com/DeeMap/gwc/service/wms?customer_key=1S7mJXVjwSzrCxSY",
            {
              layers: "DeeMap2_THA_Map",
              format: "image/png8",
              transparent: true
            }
          )
          .addTo(this.mymap);
      }
      console.log(document.querySelectorAll(".vs-table--content"));
      document.querySelectorAll(".vs-table--content")[0].style =
        "overflow: visible";
    } else {
      this.$router.push("/pages/login");
    }
  },
  filters: {
    moment: function(dete) {
      return moment(dete).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    moment: function() {
      return moment();
    },
    countDownTimer: function() {
      if (this.countDown >= 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.init();
        this.countDown = 30;
        this.countDownTimer();
      }
    },
    getOrderStatusColor(battery) {
      if (battery >= "80") return "success";
      if (battery >= "50") return "#7367F0";
      if (battery >= "20") return "warning";
      else return "danger";
    },
    init() {
      var body = {
        device_id: this.devicegetLogin
      };

      this.$axios
        .post(this.$api_url + "/getOnerealTimeID", body)
        .then(response => {
          console.log(response),
            (this.dataDeviceRealtime = response.data.resData),
            console.log(this.dataDeviceRealtime);
        });
    },
    diff_minutes(receive_time) {
      var now = new Date();
      var receiveTime = new Date(`"${receive_time}"`);
      var diff = (receiveTime.getTime() - now.getTime()) / 1000;
      diff /= 60;
      return Math.abs(Math.round(diff));
    },

    setmarker(tr) {
      console.log(tr);
      if (this.mymarker) {
        this.mymarker.remove();
      }

      // var letters = "0123456789ABCDEF";
      // var color = "#";
      // for (var i = 0; i < 6; i++) {
      //   color += letters[Math.floor(Math.random() * 16)];
      // }
      this.diff_minutes();
      if (this.diff_minutes(tr.receive_time) > 10) {
        this.myCustomColour = "#FF0000";
      } else {
        this.myCustomColour = "#0B6623";
      }

      this.markerHtmlStyles = `
  background-color: ${this.myCustomColour};
  width: 2.6rem;
  height: 2.6rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 2px solid #FFFFFF`;

      this.iconmaker = L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${this.markerHtmlStyles}" />`
      });

      this.$axios.post(this.$api_url + "/getLocation");

      this.mymap.setView([tr.lat, tr.lng], 13);

      this.mymarker = L.marker([tr.lat, tr.lng], { icon: this.iconmaker })
        .addTo(this.mymap)
        .bindPopup(
          "Device ID:" +
            tr.device_id +
            "<br>Location: " +
            tr.location.TAM_TNAME +
            ", " +
            tr.location.AMP_TNAME +
            " " +
            tr.location.PROV_TNAME +
            "<br>Time: " +
            tr.device_time
        )
        .openPopup();
    }
  }
};
</script>

<style lang="scss" scoped>
#time {
  text-align: right;
}
.overlaytable {
  z-index: 1500;
  position: absolute;
}

#mapBG {
  width: 100%;
  height: calc(100vh - 20rem);
}

#mapidRealtime {
  height: calc(100vh - 10rem);
  width: 100%;
}
</style>

<style scoped>
.vs-table--content {
  overflow: visible !important;
}
.tooltip {
  display: inline-block;
  position: relative;
  text-align: left;
}

.tooltip .right {
  min-width: 605px;
  top: 100%;
  left: 100%;
  margin-left: -2px;
  transform: translate(0, -20%);
  padding: 10px 20px;
  color: #444444;
  background-color: #ffffff;
  font-weight: normal;
  font-size: 13px;
  border-radius: 8px;
  position: absolute;
  z-index: 99999999;
  box-sizing: border-box;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  display: none;
}

.tooltip:hover .right {
  display: block;
}

.tooltip .right i {
  position: absolute;
  top: 20%;
  right: 100%;
  margin-top: -12px;
  width: 12px;
  height: 24px;
  overflow: hidden;
}

.tooltip .right i::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  left: 0;
  top: 50%;
  transform: translate(50%, -50%) rotate(-45deg);
  background-color: #eeeeee;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
}

.titleID {
  text-align: center;
}
</style>
