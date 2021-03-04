<!-- =========================================================================================
    File Name: ColorsGradient.vue.vue
    Description: Theme's main colors(primary, success etc.) with gradient
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card id="mapBG">
        <div id="mapidRealtime"></div>
    </vx-card>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import ColorsDefault from './ColorsDefault.vue'

export default {
  data: () => ({
    active: false,
    popupActive: false,
    selected: [],
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
  components: {
    LMap,
    LTileLayer,
    LMarker,
    ColorsDefault
  },
  mounted() {
    this.mymap = L.map("mapidRealtime").setView([13.676142, 100.6019176], 13);
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
    setmarker(tr) {
      if (this.mymarker) {
        this.mymarker.remove();
      }

var LeafIcon = L.Icon.extend({
    options: {
       iconSize:     [38, 92],
       shadowSize:   [50, 64],
       iconAnchor:   [22, 94],
       shadowAnchor: [4, 62],
       popupAnchor:  [-3, -76]
    }
});

var greenIcon = new LeafIcon({
    iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
    shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png'
})

      this.mymarker = L.marker([tr.lat, tr.lng],{icon: greenIcon})
        .addTo(this.mymap)
        .bindPopup(
          "Device ID:"+
          tr.device_id+
          "<br>Location: " +
            tr.tambon_name +
            ", " +
            tr.amphoe_name+
            " "+
            tr.provincename+
            "<br>Time: "+
            tr.device_time
        )
        .openPopup();
    }
  }
};
</script>

<style lang="scss" scope>

#mapBG{
  width: 100%;
  height: calc(100vh -10rem);
  
}

#mapidRealtime {
  height: calc(100vh - 13rem);
  width: 100%;
}
</style>

