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
      <vx-card class="showsearchbar"
        card-background="linear-gradient(120deg, #7f7fd5, #86a8e7, #91eae4)"
      >
        <div class="vx-row">
          <div class="vx-col md:w-1/4">
            <label class="vs-select--label text-white">ID Device</label>
            <v-select
              label="device_id"
              :options="users"
              placeholder="ID Device"
              class="bg-white"
              v-model="selectID"
            ></v-select>
          </div>
          <div class="vx-col md:w-1/4">
            <label class="vs-select--label text-white">Start time</label>
            <section>
              <date-picker
                class="w-full"
                v-model="startTime"
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
                v-model="endTime"
                type="datetime"
                placeholder="Select date and time"
              ></date-picker>
            </section>
          </div>
          <div class="vx-col md:w-1/4">
            <br />
            <vs-button
              color="#5E4DAA"
              type="filled"
              class="w-full"
              @click.prevent="buttonSearch"
              @click="isShowing = true"
              >search</vs-button
            >
          </div>
        </div>

        <div v-show="isShowing">
          <br />
          <vx-card class="showtable w-full">
            <vs-table
              max-items="5"
              pagination
              search
              v-model="selected2"
              @selected="setmarker"
              :data="users"
            >
              <template slot="thead">
                <!-- <vs-th sort-key="device_id">Device_ID</vs-th>
          <vs-th sort-key="device_name">Device name</vs-th> -->
                <vs-th width="30%" sort-key="device_time">Sent time</vs-th>
                <vs-th width="30%" sort-key="receive_time">Received time</vs-th>
                <vs-th width="10%" sort-key="speed">speed</vs-th>
                <vs-th width="15%" sort-key="battery">Battery (%)</vs-th>
                <vs-th width="15%">video</vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <!-- <vs-td :data="data[indextr].device_id">
              {{ data[indextr].device_id }}
            </vs-td>

            <vs-td :data="data[indextr].device_name">
              {{ data[indextr].device_name }}
            </vs-td> -->

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
                      `Video Device ID:${dataAll.device_id} || Time:${
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

                  <template class="expand-user" slot="expand">
                    <div class="con-expand-users w-full">
                      <div class="flex items-center justify-between">
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
                              >&nbsp;{{ data[indextr].tambon_name }},{{
                                data[indextr].amphoe_name
                              }}&nbsp;{{ data[indextr].provincename }}</span
                            >
                          </vs-row>
                        </vs-col>

                        <div class="con-userx flex items-center justify-start">
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
                        <div class="con-userx flex items-center justify-start">
                          <vs-avatar color="#BC1254" icon="sd_storage" />
                        </div>
                        <vs-col>
                          <vs-row>
                            <div class="text-primary">
                              SD card free space:
                            </div>
                            <span
                              >&nbsp;{{
                                data[indextr].sdCard_free
                              }}&nbsp;&nbsp;{{
                                data[indextr].sdCard_free_unit
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
                  </template>
                </vs-tr>
              </template>
            </vs-table>
            <vs-divider>
              <vs-button
                size="large"
                color="primary"
                type="flat"
                icon="keyboard_arrow_up"
                @click="isShowing = false"
              ></vs-button>
            </vs-divider>
          </vx-card>
        </div>
      </vx-card>
<vx-card>

        <div id="mapHistory"></div>

</vx-card>
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

export default {
  data: () => ({
    popupActive: false,
    isShowing: false,
    startTime: null,
    selectID: null,
    endTime: null,
    SearchFN: [],
    selected2: [],
    dataAll: {},

    users: [
      {
        device_id: "01",
        device_name: "test1",
        lat: "13.6769734",
        lng: "100.603769",
        speed: "1",
        battery: "20",
        sdCard_free: "20",
        sdCard_free_unit: "GB",
        storage_free: "12",
        storage_free_unit: "GB",
        gps_signal: "80",
        gsm_signal: "500",
        device_time: "2021-26-01 01:05:01 AM",
        receive_time: "2021-26-01 01:20:01 AM",
        tambon_name: "Bangna",
        amphoe_name: "Bangna",
        provincename: "Bangkok"
      },
      {
        device_id: "02",
        device_name: "test2",
        lat: "13.6756526",
        lng: "100.603769",
        speed: "0",
        battery: "80",
        sdCard_free: "20",
        sdCard_free_unit: "GB",
        storage_free: "12",
        storage_free_unit: "GB",
        gps_signal: "80",
        gsm_signal: "100",
        device_time: "2021-26-01 01:05:01 AM",
        receive_time: "2021-26-01 01:20:01 AM",
        tambon_name: "Bangna",
        amphoe_name: "Bangna",
        provincename: "Bangkok"
      },
      {
        device_id: "03",
        device_name: "test3",
        lat: "13.6696777",
        lng: "100.634721",
        speed: "1",
        battery: "19",
        sdCard_free: "20",
        sdCard_free_unit: "GB",
        storage_free: "12",
        storage_free_unit: "GB",
        gps_signal: "80",
        gsm_signal: "100",
        device_time: "2021-26-01 01:05:01 AM",
        receive_time: "2021-26-01 01:20:01 AM",
        tambon_name: "Bangna",
        amphoe_name: "Bangna",
        provincename: "Bangkok"
      },
      {
        device_id: "04",
        device_name: "test4",
        lat: "13.6752489 ",
        lng: "100.598593",
        speed: "1",
        battery: "57",
        sdCard_free: "20",
        sdCard_free_unit: "GB",
        storage_free: "12",
        storage_free_unit: "GB",
        gps_signal: "75.5",
        gsm_signal: "300",
        device_time: "2021-26-01 01:05:01 AM",
        receive_time: "2021-26-01 01:20:01 AM",
        tambon_name: "Bangna",
        amphoe_name: "Bangna",
        provincename: "Bangkok"
      },
      {
        device_id: "05",
        device_name: "test5",
        lat: "13.6770924",
        lng: "100.607044",
        speed: "1",
        battery: "90",
        sdCard_free: "20",
        sdCard_free_unit: "GB",
        storage_free: "12",
        storage_free_unit: "GB",
        gps_signal: "80",
        gsm_signal: "1000",
        device_time: "2021-26-01 01:05:01 AM",
        receive_time: "2021-26-01 01:20:01 AM",
        tambon_name: "Bangna",
        amphoe_name: "Bangna",
        provincename: "Bangkok"
      },
      {
        device_id: "06",
        device_name: "test6",
        lat: "13.6701425",
        lng: "100.601899",
        speed: "1",
        battery: "40",
        sdCard_free: "20",
        sdCard_free_unit: "GB",
        storage_free: "12",
        storage_free_unit: "GB",
        gps_signal: "80",
        gsm_signal: "800",
        device_time: "2021-26-01 01:05:01 AM",
        receive_time: "2021-26-01 01:20:01 AM",
        tambon_name: "Bangna",
        amphoe_name: "Bangna",
        provincename: "Bangkok"
      },
      {
        device_id: "07",
        device_name: "test7",
        lat: "13.6769734",
        lng: "100.603769",
        speed: "1",
        battery: "25",
        sdCard_free: "20",
        sdCard_free_unit: "GB",
        storage_free: "12",
        storage_free_unit: "GB",
        gps_signal: "80",
        gsm_signal: "100",
        device_time: "2021-26-01 01:05:01 AM",
        receive_time: "2021-26-01 01:20:01 AM",
        tambon_name: "Bangna",
        amphoe_name: "Bangna",
        provincename: "Bangkok"
      },
      {
        device_id: "08",
        device_name: "test8",
        lat: "13.6769734",
        lng: "100.603769",
        speed: "1",
        battery: "10",
        sdCard_free: "20",
        sdCard_free_unit: "GB",
        storage_free: "12",
        storage_free_unit: "GB",
        gps_signal: "80",
        gsm_signal: "100",
        device_time: "2021-26-01 01:05:01 AM",
        receive_time: "2021-26-01 01:20:01 AM",
        tambon_name: "Bangna",
        amphoe_name: "Bangna",
        provincename: "Bangkok"
      },
      {
        device_id: "09",
        device_name: "test9",
        lat: "13.6769734",
        lng: "100.603769",
        speed: "1",
        battery: "74",
        sdCard_free: "20",
        sdCard_free_unit: "GB",
        storage_free: "12",
        storage_free_unit: "GB",
        gps_signal: "800",
        gsm_signal: "1000",
        device_time: "2021-26-01 01:05:01 AM",
        receive_time: "2021-26-01 01:20:01 AM",
        tambon_name: "Bangna",
        amphoe_name: "Bangna",
        provincename: "Bangkok"
      },
      {
        device_id: "10",
        device_name: "test10",
        lat: "13.6769734",
        lng: "100.603769",
        speed: "1",
        battery: "90",
        sdCard_free: "20",
        sdCard_free_unit: "GB",
        storage_free: "12",
        storage_free_unit: "GB",
        gps_signal: "800",
        gsm_signal: "1000",
        device_time: "2021-26-01 01:05:01 AM",
        receive_time: "2021-26-01 01:20:01 AM",
        tambon_name: "Bangna",
        amphoe_name: "Bangna",
        provincename: "Bangkok"
      }
    ]
  }),
  mounted() {
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
  },
  methods: {
    getOrderStatusColor(battery) {
      if (battery >= "80") return "success";
      if (battery >= "50") return "primary";
      if (battery >= "20") return "warning";
      else return "danger";
    },
    setmarker(tr) {
      console.log(tr);
      if (this.mymarker) {
        this.mymarker.remove();
      }
      this.mymarker = L.marker([tr.lat, tr.lng])
        .addTo(this.mymap)
        .bindPopup(
          "Location: " +
            tr.tambon_name +
            ", " +
            tr.amphoe_name+
            " "+
            tr.provincename+
            "<br>Time: "+
            tr.device_time
        )
        .openPopup();
    },
    buttonSearch() {
      var latlngs = [
        [
          "Bangna",
          "Bangna",
          "Bangkok",
          "2020-01-01 13:00:00",
          13.676843962727185,
          100.60336779373546
        ],
        [
          "Bangna",
          "Bangna",
          "Bangkok",
          "2020-01-01 13:00:00",
          13.673977175567792,
          100.60510586526725
        ],
        [
          "Bangna",
          "Bangna",
          "Bangkok",
          "2020-01-01 13:00:00",
          13.672070968748224,
          100.61197315880477
        ],
        [
          "Bangna",
          "Bangna",
          "Bangkok",
          "2020-01-01 13:00:00",
          13.669477349285598,
          100.6245494591523
        ],
        [
          "Bangna",
          "Bangna",
          "Bangkok",
          "2020-01-01 13:00:00",
          13.664540235001342,
          100.65191620354403
        ]
      ];

      var latlng_line = [];
      for (var i = 0; i < latlngs.length; i++) {
        L.marker([latlngs[0][4], latlngs[0][5]])
          .bindPopup(
            "Location: " +
              latlngs[i][0] +
              "," +
              latlngs[i][1] +
              " " +
              latlngs[i][2] +
              "<br>Time: " +
              latlngs[i][3]
          )
          .addTo(this.mymap);
        L.marker([
          latlngs[latlngs.length - 1][4],
          latlngs[latlngs.length - 1][5]
        ])
          .bindPopup(
            "Location: " +
              latlngs[i][0] +
              "," +
              latlngs[i][1] +
              " " +
              latlngs[i][2] +
              "<br>Time: " +
              latlngs[i][3]
          )
          .addTo(this.mymap);

        latlng_line.push([latlngs[i][4], latlngs[i][5]]);
      }
      console.log(latlng_line);
      var polyline = L.polyline(latlng_line, { color: "#C5211C" });
      polyline.addTo(this.mymap);
    }
  },
  components: {
    "v-select": vSelect,
    DatePicker,
    LMap,
    LTileLayer,
    LMarker,
    VxCard
  }
};
</script>

<style lang="scss" scoped>
#mapBG{
  width: 100%;
  height: calc(100vh -10rem);
  
}

#mapHistory {
  height: calc(100vh - 13rem);
  width: 100%;
}
</style>
