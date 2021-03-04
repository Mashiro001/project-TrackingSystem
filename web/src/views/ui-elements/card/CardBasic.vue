<!-- =========================================================================================
    File Name: CardBasic.vue
    Description: Basic Cards
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card>
    <!------------------- register ------------------------->
    <div class="overlayLeft">
      <vs-button
        @click="popupRegist = true"
        color="primary"
        type="gradient"
        icon="add"
        >Regist device</vs-button
      >
    </div>

    <vs-popup
      classContent="popup-example"
      title="Regist your device"
      :active.sync="popupRegist"
    >

    <!----------------- FormRegister---------------->
    <div class="overlayZIndex">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color2">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img
                src="@/assets/images/pages/forgot-password.png"
                alt="login"
                class="mx-auto"
              />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <vx-card title="Register">
                <h6>Register your device to your account.</h6>
                <div class="mt-5">
                  <form data-vv-scope="step-1">
                    <vs-input
                      v-validate="'required'"
                      icon="icon-smartphone"
                      icon-pack="feather"
                      placeholder="Device ID"
                      name="input1"
                      v-model="valueDeviceID"
                      class="mt-5 text-black"
                    />
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('input1')"
                      >{{ errors.first("input1") }}</span
                    >

                    <vs-input
                      v-validate="'required'"
                      icon="icon-user"
                      icon-pack="feather"
                      placeholder="Device name"
                      name="input2"
                      v-model="valueDevicename"
                      class="mt-5 text-black"
                    />
                    <span
                      class="text-danger text-sm"
                      v-show="errors.has('input2')"
                      >{{ errors.first("input2") }}</span
                    >

                    <vs-button
                      type="filled"
                      @click.prevent="submitFormRegister"
                      class="mt-5 block"
                      >Submit</vs-button
                    >

                    <!-------------- RegistSuccess ------------ -->
                    <vs-popup
                      class="holamundo"
                      title="Register your device to your account."
                      :active.sync="popupActiveSuccess"
                    >
                      <vs-row>
                        <vs-col
                          vs-type="flex"
                          vs-justify="center"
                          vs-align="center"
                          vs-w="12"
                        >
                          <div>
                            <img
                              src="@/assets/images/pages/icon-success.png"
                              height="120px"
                              width="120px"
                            />
                          </div>
                        </vs-col>
                        <vs-col
                          vs-type="flex"
                          vs-justify="center"
                          vs-align="center"
                          vs-w="12"
                        >
                          <h1><p>Success!</p></h1>
                        </vs-col>
                      </vs-row>
                    </vs-popup>

                    <!------------------- RegistFail ---------------->
                    <vs-popup
                      class="holamundo"
                      title="Register your device to your account."
                      :active.sync="popupActiveFail"
                    >
                      <vs-row>
                        <vs-col
                          vs-type="flex"
                          vs-justify="center"
                          vs-align="center"
                          vs-w="12"
                        >
                          <div>
                            <img
                              src="@/assets/images/pages/icon-fail.jpg"
                              height="120px"
                              width="120px"
                            />
                          </div>
                        </vs-col>
                        <vs-col
                          vs-type="flex"
                          vs-justify="center"
                          vs-align="center"
                          vs-w="12"
                        >
                          <h1><p>This ID has been registered.</p></h1>
                        </vs-col>
                      </vs-row>
                    </vs-popup>

                    <!-------------- RegisterWarning ---------------->
                    <vs-popup
                      class="holamundo"
                      title="Register your device to your account."
                      :active.sync="popupActiveWarning"
                    >
                      <vs-row>
                        <vs-col
                          vs-type="flex"
                          vs-justify="center"
                          vs-align="center"
                          vs-w="12"
                        >
                          <div>
                            <img
                              src="@/assets/images/pages/icon-warning.png"
                              height="120px"
                              width="120px"
                            />
                          </div>
                        </vs-col>
                        <vs-col
                          vs-type="flex"
                          vs-justify="center"
                          vs-align="center"
                          vs-w="12"
                        >
                          <h1><p>Please fill out all information.</p></h1>
                        </vs-col>
                      </vs-row>
                    </vs-popup>
                  </form>
                </div>
              </vx-card>
            </div>
          </div>
        </div>
      </vx-card>
      </div>
    </vs-popup>
  
    <vs-table
      v-model="selected"
      pagination
      search
      max-items="5"
      :data="users"
    >
      <template slot="thead">
        <vs-th sort-key="device_id" width="30%">ID device</vs-th>
        <vs-th sort-key="device_name" width="35%">Device name</vs-th>
        <vs-th width="35%"></vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].device_id">
            {{ data[indextr].device_id }}
          </vs-td>

          <vs-td :data="data[indextr].device_name">
            {{ data[indextr].device_name }}
          </vs-td>

          <vs-td>
            <div class="flex mb-4">
              <div class="w-1/2 bg-grid-color-secondary h-12">
                <vs-button
                  @click="
                    popupActive = true;
                    dataAll = data[indextr];
                  "
                  color="warning"
                  type="filled"
                  icon="create"
                  >Edit name</vs-button
                >
              </div>
              <div class="w-1/2 bg-grid-color h-12">
                <vs-button
                  @click="
                    popupActive5 = true;
                    dataAll = data[indextr];
                  "
                  color="red"
                  type="filled"
                  icon="delete"
                  >Delete</vs-button
                >
              </div>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <!----------------------- Rename -------------------->
    <vs-popup
      classContent="popup-example"
      :title="`Rename your device ID: ${dataAll.device_id}`"
      :active.sync="popupActive"
    >
      <vs-input
        class="inputx mb-3"
        placeholder="New Device name"
        v-model="value1"
      />
      <vs-button @click.prevent="submitForm" color="primary" type="filled"
        >Submit</vs-button
      >

      <vs-popup
        class="holamundo"
        :title="`Rename your device ID: ${dataAll.device_id}`"
        :active.sync="popupActive2"
      >
        <vs-row>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <div>
              <img
                src="@/assets/images/pages/icon-success.png"
                height="120px"
                width="120px"
              />
            </div>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <h1><p>Success!</p></h1>
          </vs-col>
        </vs-row>
      </vs-popup>

      <vs-popup
        class="holamundo"
        :title="`Rename your device ID: ${dataAll.device_id}`"
        :active.sync="popupActive3"
      >
        <vs-row>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <div>
              <img
                src="@/assets/images/pages/icon-warning.png"
                height="120px"
                width="120px"
              />
            </div>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <h1><p>Please fill out all information.</p></h1>
          </vs-col>
        </vs-row>
      </vs-popup>

      <vs-popup
        class="holamundo"
        :title="`Rename your device ID: ${dataAll.device_id}`"
        :active.sync="popupActive4"
      >
        <vs-row>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <div>
              <img
                src="@/assets/images/pages/icon-fail.jpg"
                height="120px"
                width="120px"
              />
            </div>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <h1><p>You have already used this name.</p></h1>
          </vs-col>
        </vs-row>
      </vs-popup>
    </vs-popup>

    <!-- -----------------Delete--------------------->
    <vs-popup
      classContent="popup-example"
      title="Delete device"
      :active.sync="popupActive5"
    >
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <div>
            <img
              src="@/assets/images/pages/icon-question.png"
              height="120px"
              width="120px"
            />
          </div>
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="12"
          class="mb-2"
        >
          <h2><p>Do you want to delete this device ID:</p></h2>
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="12"
          class="mb-2"
        >
          <h2>
            <p>{{ dataAll.device_id }}</p>
          </h2>
        </vs-col>

        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <div class="flex mb-4">
            <div class="w-1/2 px-2 bg-grid-color-secondary h-12">
              <vs-button
                @click="
                  (popupActive6 = true), (popupActive5 = false);
                  dataAll = data[indextr];
                "
                color="success"
                type="filled"
                >Submit</vs-button
              >
            </div>
            <div class="w-1/2 px-2 bg-grid-color h-12">
              <vs-button
                @click="popupActive5 = false"
                color="#878787"
                type="filled"
                >cancel</vs-button
              >
            </div>
          </div>
        </vs-col>
      </vs-row>

      <vs-popup title="Delete Device" :active.sync="popupActive6">
        <vs-row>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <div>
              <img
                src="@/assets/images/pages/icon-success.png"
                height="120px"
                width="120px"
              />
            </div>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <h1><p>Success!</p></h1>
          </vs-col>
        </vs-row>
      </vs-popup>
    </vs-popup>
  </vx-card>
</template>

<script>
import Prism from "vue-prism-component";

export default {
  data() {
    return {
      valueDeviceID: "",
      valueDevicename: "",
      popupRegist: false,
      popupRegistDevice: false,
      popupRegistDevice2: false,
      popupActiveSuccess: false,
      popupActiveFail: false,
      popupActiveWarning: false,
      value1: "",
      dataAll: {},
      selected: [],
      popupActive: false,
      popupActive2: false,
      popupActive3: false,
      popupActive4: false,
      popupActive5: false,
      popupActive6: false,
      tableList: [
        "vs-th: Component",
        "vs-tr: Component",
        "vs-td: Component",
        "thread: Slot",
        "tbody: Slot",
        "header: Slot"
      ],
      users: [
        {
          device_id: "01978451346134",
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
          receive_time: "2021-26-01 01:20:01 AM"
        },
        {
          device_id: "02987845466561",
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
          receive_time: "2021-26-01 01:20:01 AM"
        },
        {
          device_id: "03856215875547",
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
          receive_time: "2021-26-01 01:20:01 AM"
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
          receive_time: "2021-26-01 01:20:01 AM"
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
          receive_time: "2021-26-01 01:20:01 AM"
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
          receive_time: "2021-26-01 01:20:01 AM"
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
          receive_time: "2021-26-01 01:20:01 AM"
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
          receive_time: "2021-26-01 01:20:01 AM"
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
          receive_time: "2021-26-01 01:20:01 AM"
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
          receive_time: "2021-26-01 01:20:01 AM"
        }
      ]
    };
  },
  components: {
    Prism
  },
  watch: {
        popupActive(value){
            console.log(value)
        },
        popupActive2(value){
            console.log(value)
        }
    },
  methods: {
    submitForm() {
      this.obj = this.users.find(o => o.device_name == this.value1);
      console.log(this.obj);
      console.log(this.dataAll.device_name)
      console.log(this.value1);
      try {
        if (this.value1 == "") {
          this.popupActive = false;
          this.popupActive3 = true;
        } else if (this.value1 == this.dataAll.device_name) {
          this.popupActive = false;
          this.popupActive4 = true;
        } else {
          this.popupActive = false;
          this.popupActive2 = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    submitFormRegister() {
      this.obj = this.users.find(o => o.device_id == this.valueDeviceID);
      console.log(this.obj);
      console.log(this.valueDeviceID);
      try {
        if (this.valueDeviceID == "" || this.valueDevicename == "") {
          this.popupActiveWarning = true;
          this.popupRegist = true;
        } else {
          try {
            if (this.obj == undefined) {
              //Success
              this.popupActiveSuccess = true;
              this.popupRegist = true;
            } else {
              this.popupActiveFail = true;
              this.popupRegist = true;
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scope>
.overlayLeft {
  top: 30px;
  left: 40px;
  z-index: 3;
  position: absolute;
}

.overlayZIndex {
  z-index: 100;
}
</style>
