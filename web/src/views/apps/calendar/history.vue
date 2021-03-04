<!-- =========================================================================================
    File Name: Calendar.vue
    Description: Calendar App
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="calendar-app">
    <vx-card
      class="showsearchbar"
      card-background="linear-gradient(120deg, #FD5A68, #FC8884, #EEF)"
    >
      <div class="vx-row">
        <div class="vx-col md:w-1/4">
          <label class="vs-select--label text-white">Device name</label>
          <v-select
            :options="dataAllDevice"
            label="device_name"
            placeholder="Device name"
            class="bg-white selectID"
            v-model="deviceX"
          ></v-select>
        </div>
        <div class="vx-col md:w-1/4">
          <label class="vs-select--label text-white">Start time</label>
          <section>
            <date-picker
              class="w-full"
              v-model="deviceTimeStart"
              type="datetime"
              placeholder="Select date and time"
            ></date-picker>
          </section>
        </div>
        <div class="vx-col md:w-1/4">
          <label class="vs-select--label text-white">End time</label>
          <section>
            <date-picker
              class="w-full"
              v-model="deviceTimeEnd"
              type="datetime"
              placeholder="Select date and time"
            ></date-picker>
          </section>
        </div>
        <div class="vx-col md:w-1/4">
          <br />
          <vs-button
            color="#CC184E"
            type="filled"
            class="w-full"
            @click.prevent="buttonSearch"
            >search</vs-button
          >
        </div>
      </div>
    </vx-card>

    <div id="showDetail" v-show="isShowing">
      <div class="mt-2">
        <vx-card>
          <vs-collapse-item icon-arrow="arrow_downward">
            <div slot="header">
              <div class="con-expand-users w-full">
                <div class="flex items-center justify-between">
                  <div class="con-userx flex items-center justify-start">
                    <vs-icon icon="toc" size="medium" color="primary"></vs-icon>
                  </div>
                  <vs-col>
                    <vs-row>
                      <div class="text-primary">
                        Data device: {{ deviceX.device_name }}
                      </div>
                      <span
                        >&nbsp;ระหว่างวันที่ {{ deviceTimeStart | moment }} นาที
                        ถึง วันที่ {{ deviceTimeEnd | moment }} นาที
                      </span>
                    </vs-row>
                  </vs-col>
                </div>
              </div>
            </div>

            <div id="showtable">
              <vx-card>
                <vs-table
                  max-items="5"
                  pagination
                  search
                  v-model="selected2"
                  @selected="setmarker"
                  :data="dataSearchHistory"
                >
                  <template slot="thead">
                    <vs-th>Detail</vs-th>
                    <vs-th width="30%" sort-key="device_time">Sent time</vs-th>
                    <vs-th width="30%" sort-key="receive_time"
                      >Received time</vs-th
                    >
                    <vs-th width="10%" sort-key="speed">speed</vs-th>
                    <vs-th width="15%" sort-key="battery">Battery (%)</vs-th>
                    <vs-th width="15%">video</vs-th>
                  </template>

                  <template slot-scope="{ data }">
                    <vs-tr
                      :data="tr"
                      :key="indextr"
                      v-for="(tr, indextr) in data"
                    >
                      <div class="tooltip">
                        <vs-td>
                          <vs-chip color="primary">
                            Details
                          </vs-chip>
                          <div class="right">
                            <div class="con-expand-users w-full">
                              <!-- <vs-divider position="center"><h6><div class="titleID">Detail device ID: {{ data[indextr].device_id }}</div></h6></vs-divider> -->
                              <div class="flex items-center justify-between">
                                <div
                                  class="con-userx flex items-center justify-start"
                                >
                                  <vs-avatar
                                    color="primary"
                                    icon="location_on"
                                  />
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
                                      >&nbsp;{{
                                        data[indextr].gps_signal
                                      }}&nbsp; KM/h</span
                                    >
                                  </vs-row>
                                  <vs-row>
                                    <div class="text-primary">
                                      Internet speed:
                                    </div>
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
                                  <vs-avatar
                                    color="#BC1254"
                                    icon="sd_storage"
                                  />
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

                      <vs-td :data="data[indextr].device_time">
                        {{ data[indextr].device_time }}
                      </vs-td>

                      <vs-td :data="data[indextr].receive_time">
                        {{ data[indextr].receive_time }}
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

                      <vs-td>
                        <vs-button
                          @click="
                            popupActive = true;
                            dataAll = data[indextr];
                          "
                          size="small"
                          color="#3E60C1"
                          type="filled"
                          icon-pack="feather"
                          icon="icon-video"
                          >View</vs-button
                        >
                      </vs-td>

                      <vs-popup
                        class="holamundo"
                        :title="
                          `Video Device ID:${dataAll.device_name} || Time:${
                            dataAll.device_time
                          }`
                        "
                        :active.sync="popupActive"
                      >
                        <div class="flex flex-wrap">
                          <div
                            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 bg-grid-color"
                          >
                            <video width="550" height="300" controls>
                              <source
                                src="http://www.tplh.net/file/sample.mp4"
                                type="video/mp4"
                              />
                            </video>
                          </div>
                        </div>
                      </vs-popup>

                      <!-- <template class="expand-user" slot="expand">
                        <div class="con-expand-users w-full">
                          <div class="flex items-center justify-between">
                            <div
                              class="con-userx flex items-center justify-start"
                            >
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
                                <div class="text-primary">
                                  Internet speed:
                                </div>
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
                      </template> -->
                    </vs-tr>
                  </template>
                </vs-table>
              </vx-card>
            </div>
          </vs-collapse-item>
        </vx-card>
      </div>
    </div>

    <!-- <vx-card id="mapHistoryBG" class="mt-3"> -->
    <div id="mapHistory" class="mt-3">
      <div class="overlayLeft">
        <div class="tooltip">
          <vs-icon size="small" icon="info" color="primary"></vs-icon>
          <div class="left">
            <div class="flex">
              <div class="w-1/3 bg-grid-color h-4">
                <vs-icon icon="circle" size="10px" bg="#006BBB" round></vs-icon
                >&nbsp;Start
              </div>
              <div class="w-1/3 bg-grid-color h-4">
                <vs-icon icon="circle" size="10px" bg="#C6DF76" round></vs-icon
                >&nbsp;Between
              </div>
              <div class="w-1/3 bg-grid-color h-4 ml-4">
                <vs-icon icon="circle" size="10px" bg="#CC184E" round></vs-icon
                >&nbsp;The End
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <vs-popup
      class="holamundo"
      title="Search you device."
      :active.sync="popupActiveWarning"
    >
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <div>
            <img
              src="@/assets/images/pages/icon-warning.png"
              height="120px"
              width="120px"
            />
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <h1><p>Please fill out all information.</p></h1>
        </vs-col>
      </vs-row>
    </vs-popup>

    <vs-popup
      class="holamundo"
      title="Search you device."
      :active.sync="popupActiveNotfind"
    >
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <div>
            <img
              src="@/assets/images/pages/icon-notfind.png"
              height="120px"
              width="120px"
            />
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <h1><p>No data history.</p></h1>
        </vs-col>
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
import vSelect from "vue-select";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import VxCard from "../../../components/vx-card/VxCard.vue";
import moment from "moment";

export default {
  data: () => ({
    colorAlert: "#FD5A68",
    activeAlert: false,
    popupActiveWarning: false,
    popupActiveNotfind: false,
    popupActive: false,
    isShowing: false,
    deviceTimeStart: "",
    deviceX: "",
    deviceTimeEnd: "",
    SearchFN: [],
    selected2: [],
    dataAll: {},

    searchHistoryTimeData: [],
    dataHistory: [],
    dataAllDevice: [],
    dataSearchHistory: [],

    mymap: null
  }),

  mounted() {
    if (localStorage.getItem("userIDLogin"))
      this.userLogin = localStorage.getItem("userIDLogin");
    console.log(this.userLogin);

    this.init();
    //   var body = {
    //             user: this.userLogin
    //           };

    // this.$axios.post(this.$api_url + "/getOneDeviceID" ,body).then(response => {
    //   console.log(response), (this.dataAllDevice = response.data.data);
    // });

    this.mymap = L.map("mapHistory").setView([13.676142, 100.6019176], 13);
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

    document.querySelectorAll(".vs-table--content")[0].style =
      "overflow: visible";
  },

  watch: {
    dataSearchHistory(val) {
      if (val.length > 0) {
        this.isShowing = true;
        if (this.mymarker1 != undefined && this.mymarker2 != undefined) {
          this.mymap.removeLayer(this.mymarker1);
          this.mymap.removeLayer(this.mymarker2);
          this.mymap.removeLayer(this.polyline);
          this.mymap.removeLayer(this.mymarker);

          // this.mymap.polyline.remove()
          // this.polyline.remove();
        }

        // ------------------marker------------------
        this.myStartColour = "#006BBB";
        this.myEndColour = "#CC184E";
        this.mybwColour = "#C6DF76";

        // ------------------start------------------
        this.markerHtmlStyles = `
              background-color: ${this.myStartColour};
              width: 2rem;
              height: 2rem;
              display: block;
              left: -1rem;
              top: -1.5rem;
              position: relative;
              border-radius: 3rem 3rem 0;
              transform: rotate(45deg);
              border: 1px solid #FFFFFF`;

        this.iconmakerstart = L.divIcon({
          className: "my-custom-pin",
          iconAnchor: [0, 11],
          labelAnchor: [-6, 0],
          popupAnchor: [0, -36],
          html: `<span style="${this.markerHtmlStyles}" />`
        });

        // ------------------end----------------

        this.markerHtmlStyles = `
              background-color: ${this.myEndColour};
              width: 2rem;
              height: 2rem;
              display: block;
              left: -1rem;
              top: -1.5rem;
              position: relative;
              border-radius: 3rem 3rem 0;
              transform: rotate(45deg);
              border: 1px solid #FFFFFF`;

        this.iconmakerend = L.divIcon({
          className: "my-custom-pin",
          iconAnchor: [0, 11],
          labelAnchor: [-6, 0],
          popupAnchor: [1, -34],
          html: `<span style="${this.markerHtmlStyles}" />`
        });

        //------------------bw-------------------------
        this.markerHtmlStyles = `
              background-color: ${this.mybwColour};
              width: 2rem;
              height: 2rem;
              display: block;
              left: -1rem;
              top: -1rem;
              position: relative;
              border-radius: 3rem 3rem 0;
              transform: rotate(45deg);
              border: 1px solid #FFFFFF`;

        this.iconmakerbw = L.divIcon({
          className: "my-custom-pin",
          iconAnchor: [0, 24],
          labelAnchor: [-6, 0],
          popupAnchor: [0, -36],
          html: `<span style="${this.markerHtmlStyles}" />`
        });

        this.mymap.setView([this.polydata[0][4], this.polydata[0][5]], 15);

        this.mymarker1 = L.marker([this.polydata[0][4], this.polydata[0][5]], {
          icon: this.iconmakerstart
        })
          .bindPopup(
            "Location: " +
              this.polydata[0][0] +
              "," +
              this.polydata[0][1] +
              " " +
              this.polydata[0][2] +
              "<br>Time: " +
              this.polydata[0][3]
          )
          .addTo(this.mymap);

        this.mymarker2 = L.marker(
          [
            this.polydata[this.polydata.length - 1][4],
            this.polydata[this.polydata.length - 1][5]
          ],
          { icon: this.iconmakerend }
        )
          .bindPopup(
            "Location: " +
              this.polydata[this.polydata.length - 1][0] +
              "," +
              this.polydata[this.polydata.length - 1][1] +
              " " +
              this.polydata[this.polydata.length - 1][2] +
              "<br>Time: " +
              this.polydata[this.polydata.length - 1][3]
          )
          .addTo(this.mymap);

        var latlng_line = [];
        for (var i = 0; i < this.polydata.length; i++) {
          latlng_line.push([this.polydata[i][4], this.polydata[i][5]]);
        }

        this.polyline = L.polyline(latlng_line, { color: "#C5211C" });
        this.polyline.addTo(this.mymap);
      } else {
        this.mymap.removeLayer(this.mymarker1);
        this.mymap.removeLayer(this.mymarker2);
        // console.log()
      }
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
    init() {
      var body = {
        user: this.userLogin
      };

      this.$axios
        .post(this.$api_url + "/getOneDeviceID", body)
        .then(response => {
          console.log(response), (this.dataAllDevice = response.data.data);
        });
    },
    getOrderStatusColor(battery) {
      if (battery >= "80") return "success";
      if (battery >= "50") return "#7367F0";
      if (battery >= "20") return "warning";
      else return "danger";
    },

    async buttonSearch() {
      try {
        if (
          this.deviceX == "" ||
          this.deviceTimeStart == "" ||
          this.deviceTimeEnd == ""
        ) {
          this.popupActiveWarning = true;
        } else {
          try {
            if (this.deviceTimeEnd <= this.deviceTimeStart) {
              this.$vs.notify({
                color: this.colorAlert,
                title: "Warning!",
                text: "The end time should be greater than the start time.",
                position: "top-right"
              });
            } else {
              if (this.device_id != undefined) {
                this.device_id = "";
                this.device_timeStart = "";
                this.device_timeEnd = "";
                this.dataforHistory = "";
                this.polydata = "";
              }

              var body = {
                device_id: this.deviceX.device_id,
                device_timeStart: this.deviceTimeStart,
                device_timeEnd: this.deviceTimeEnd
              };
              var dataforHistory = await this.$axios.post(
                this.$api_url + "/searchHistoryTime",
                body
              );

              try {
                if (dataforHistory.data.status == 0) {
                  this.popupActiveNotfind = true;
                  this.isShowing = false;
                  this.polydata = [];
                  this.dataSearchHistory = [];
                  this.mymap.removeLayer(this.mymarker1);
                  this.mymap.removeLayer(this.mymarker2);
                  this.mymap.removeLayer(this.polyline);
                  this.mymap.removeLayer(this.mymarker);
                } else {
                  this.polydata = dataforHistory.data.data;
                  this.dataSearchHistory = dataforHistory.data.resData;
                  this.isShowing = true;
                }
              } catch (error) {
                console.log(error);
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    setmarker(tr) {
      console.log(tr);
      if (this.mymarker) {
        this.mymarker.remove();
      }

      this.mymarker = L.marker([tr.lat, tr.lng], { icon: this.iconmakerbw })
        .addTo(this.mymap)
        .bindPopup(
          "Location: " +
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
  },
  components: {
    "v-select": vSelect,
    DatePicker,
    LMap,
    LTileLayer,
    LMarker,
    VxCard,
    moment
  }
};
</script>

<style lang="scss" scoped>
// #mapHistory {
//   height: calc(100vh - 13.4rem);
//   width: 100%;
// }
.overlayLeft {
  top: 15px;
  right: 15px;
  z-index: 9000;
  position: absolute;
}

.selectID {
  z-index: 12000;
}
#mapHistoryBG {
  height: calc(100vh - 12rem);
  width: 100%;
}

#overlaytableHistory {
  z-index: 150000;
  position: absolute;
}

#showtable {
  z-index: 10000;
  position: absolute;
}

#showDetail {
  cursor: pointer;
}
</style>

<style scoped>
#mapHistory {
  width: 100%;
  height: calc(100vh - 13.8rem);
}

.vs-table--content {
  overflow: visible !important;
}
.tooltip {
  display: inline-block;
  position: relative;
  text-align: left;
}

.tooltip .right {
  min-width: 610px;
  top: 75%;
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

.tooltip .left {
  min-width: 240px;
  top: 100%;
  right: 100%;
  margin-right: 10px;
  transform: translate(0, -50%);
  padding: 13px;
  color: #666666;
  background-color: hsl(0, 0%, 100%);
  font-weight: normal;
  font-size: 13px;
  border-radius: 8px;
  position: absolute;
  z-index: 99999999;
  box-sizing: border-box;
  display: none;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
}

.tooltip:hover .left {
  display: block;
}

/* .tooltip .left i {
    position:absolute;
    top:15%;
    left:100%;
    margin-top:-12px;
    width:12px;
    height:24px;
    overflow:hidden;
}

.tooltip .left i::after {
    content:'';
    position:absolute;
    width:12px;
    height:12px;
    left:0;
    top:50%;
    transform:translate(-50%,-50%) rotate(-45deg);
    background-color:#ffffff;
    border:1px solid rgb(255, 255, 255);
} */
</style>
