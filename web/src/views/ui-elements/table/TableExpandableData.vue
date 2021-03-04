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
    <div id="mapid"></div>
    <vs-table max-items="5" pagination v-model="selected" @selected="setmarker" search :data="users">
      <template slot="thead">
        <vs-th>ID device</vs-th>
        <vs-th>Latitude</vs-th>
        <vs-th>Longitude</vs-th>
        <vs-th>speed</vs-th>
        <vs-th>Battery (%)</vs-th>
        <vs-th>SD card free space</vs-th>
        <vs-th>SD card free unit </vs-th>
        <vs-th>Storage free space</vs-th>
        <vs-th>Storage free unit</vs-th>
        <vs-th>Gps speed signal (KM/h)</vs-th>
        <vs-th>Internet speed (Mbps)</vs-th>
        <vs-th>Date / Time</vs-th>
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

          <vs-td :data="data[indextr].date_time">
            {{ data[indextr].date_time }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  data: () => ({
    popupActive: false,
    selected: [],
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
        date_time: "2020-12-02 01:30:01 AM"
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
        date_time: "2020-12-02 01:30:01 AM"
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
        date_time: "2020-12-02 01:30:01 AM"
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
        date_time: "2020-12-02 01:30:01 AM"
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
        date_time: "2020-12-02 01:30:01 AM"
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
        date_time: "2020-12-02 01:30:01 AM"
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
        date_time: "2020-12-02 01:30:01 AM"
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
        date_time: "2020-12-02 01:30:01 AM"
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
        date_time: "2020-12-02 01:30:01 AM"
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
        date_time: "2020-12-02 01:30:01 AM"
      }
    ],
  }),
  name: "email",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    
  },
  mounted() {
    this.mymap = L.map("mapid").setView([13.676142, 100.6019176], 13);
    L.tileLayer.wms("https://www.deemap.com/DeeMap/gwc/service/wms?customer_key=1S7mJXVjwSzrCxSY",
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
            if ( this.mymarker) {
               this.mymarker.remove();
     }
             this.mymarker = L.marker([tr.lat,tr.lng]).addTo(this.mymap)
            .bindPopup("device id: "+tr.device_id+"<br>Lat: "+tr.lat+"<br>Lng: "+tr.lng)
            .openPopup();
        }
  }
};
</script>

<style>
#mapid {
height: 400px;
}
</style>

