<!-- =========================================================================================
    File Name: AgGridTable.vue
    Description: Ag Grid table
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<!-- =========================================================================================
    File Name: TableExpandableData.vue
    Description: Create expandable rows which have custom data
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
<template>
  <vx-card>
    <vx-card
      card-background="linear-gradient(120deg, #7f7fd5, #86a8e7, #91eae4)"
    >
      <div class="vx-row">
        <div class="vx-col md:w-1/4">
          <label class="vs-select--label text-white">ID Device</label>
          <v-select
            multiple
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
          <vs-button color="#5E4DAA" type="filled" class="w-full"
            >search</vs-button
          >
        </div>
      </div>
    </vx-card>

    <br />
    <!-- map -->
    <div id="mapid"></div>
    <vs-table
      max-items="5"
      pagination
      @selected="setmarker"
      search
      :data="users"
      v-model="selected2"
    >
      <template slot="thead">
        <vs-th sort-key="device_id">Device ID</vs-th>
        <vs-th sort-key="lat">Latitude</vs-th>
        <vs-th sort-key="lng">Longitude</vs-th>
        <vs-th sort-key="speed">speed</vs-th>
        <vs-th sort-key="battery">Battery (%)</vs-th>
        <vs-th sort-key="sdCard_free">SD card free space</vs-th>
        <vs-th sort-key="sdCard_free_unit">SD card free unit </vs-th>
        <vs-th sort-key="storage_free">Storage free space</vs-th>
        <vs-th sort-key="storage_free_unit">Storage free unit</vs-th>
        <vs-th sort-key="gps_signal">Gps speed signal (KM/h)</vs-th>
        <vs-th sort-key="gsm_signal">Internet speed (Mbps)</vs-th>
        <vs-th sort-key="device_time">Sent time</vs-th>
        <vs-th sort-key="receive_time">Received time</vs-th>
        <vs-th>Video</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].device_id">
            {{ data[indextr].device_id }}
          </vs-td>

          <vs-td :data="data[indextr].lat">
            {{ data[indextr].lat }}
          </vs-td>

          <vs-td :data="data[indextr].lng">
            {{ data[indextr].lng }}
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

          <vs-td :data="data[indextr].sdCard_free">
            {{ data[indextr].sdCard_free }}
          </vs-td>

          <vs-td :data="data[indextr].sdCard_free_unit">
            {{ data[indextr].sdCard_free_unit }}
          </vs-td>

          <vs-td :data="data[indextr].storage_free">
            {{ data[indextr].storage_free }}
          </vs-td>

          <vs-td :data="data[indextr].storage_free_unit">
            {{ data[indextr].storage_free_unit }}
          </vs-td>

          <vs-td :data="data[indextr].gps_signal">
            {{ data[indextr].gps_signal }}
          </vs-td>

          <vs-td :data="data[indextr].gsm_signalsdCard_free_unit">
            {{ data[indextr].gsm_signal }}
          </vs-td>

          <vs-td :data="data[indextr].device_time">
            {{ data[indextr].device_time }}
          </vs-td>

          <vs-td :data="data[indextr].receive_time">
            {{ data[indextr].receive_time }}
          </vs-td>

          <vs-td>
            <vs-button
              @click="popupActive = true; 
              dataAll=data[indextr]" 
              color="#3E60C1"
              type="filled"
              icon-pack="feather"
              icon="icon-video"
              >View</vs-button
            >
          </vs-td>

          <vs-popup class="holamundo" :title="`Video Device ID:${dataAll.device_id} || Time:${dataAll.device_time}`" :active.sync="popupActive">
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
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import vSelect from "vue-select";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  data: () => ({
    popupActive: false,
    startTime: null,
    selectID: null,
    endTime: null,
    selected2: [],
    dataAll:{},

    users: [
      {
        device_id: "01",
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
        receive_time: "2021-26-01 01:20:01 AM"
      },
      {
        device_id: "02",
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
        receive_time: "2021-26-01 01:20:01 AM"
      },
      {
        device_id: "03",
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
        receive_time: "2021-26-01 01:20:01 AM"
      },
      {
        device_id: "04",
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
        receive_time: "2021-26-01 01:20:01 AM"
      },
      {
        device_id: "05",
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
        receive_time: "2021-26-01 01:20:01 AM"
      },
      {
        device_id: "06",
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
        receive_time: "2021-26-01 01:20:01 AM"
      },
      {
        device_id: "07",
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
        receive_time: "2021-26-01 01:20:01 AM"
      },
      {
        device_id: "08",
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
        receive_time: "2021-26-01 01:20:01 AM"
      },
      {
        device_id: "09",
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
        receive_time: "2021-26-01 01:20:01 AM"
      },
      {
        device_id: "10",
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
        receive_time: "2021-26-01 01:20:01 AM"
      }
    ]
  }),
  mounted() {
    this.mymap = L.map("mapid").setView([13.676142, 100.6019176], 13);
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

    var latlngs = [
      ["2020-01-01 13:00:00", 13.676843962727185, 100.60336779373546],
      ["2020-01-02 13:05:00", 13.673977175567792, 100.60510586526725],
      ["2020-01-03 13:10:00", 13.672070968748224, 100.61197315880477],
      ["2020-01-04 13:00:00", 13.669477349285598, 100.6245494591523],
      ["2020-01-05 13:00:00", 13.664540235001342, 100.65191620354403]
    ];

    var latlng_line = [];
    for (var i = 0; i < latlngs.length; i++) {
      L.marker([latlngs[i][1], latlngs[i][2]])
        .bindPopup(latlngs[i][0])
        .addTo(this.mymap);
      latlng_line.push([latlngs[i][1], latlngs[i][2]]);
    }
    console.log(latlng_line);
    var polyline = L.polyline(latlng_line, { color: "#C5211C" });
    polyline.addTo(this.mymap);
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
        .bindPopup("device id: " +tr.device_id +"<br>Lat: " +tr.lat +"<br>Lng: " +tr.lng)
        .openPopup();
    }
  },
  components: {
    "v-select": vSelect,
    DatePicker,
    LMap,
    LTileLayer,
    LMarker
  }
};
</script>

<style>
#mapid {
  height: 400px;
}
</style>
