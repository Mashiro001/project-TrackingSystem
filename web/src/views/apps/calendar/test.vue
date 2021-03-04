<template>
  <div class="flex mb-4">
    <div class="w-3/4 bg-grid-color-secondary h-12">
      <vx-card id="cardtabledevice">
        <div
          id="cardBGevice"
          class="flex w-full vx-row no-gutter items-center justify-center"
        >
          <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <div class="pictable">
              <h1 class="text-primary mb-3 text-center">Regist you devices</h1>
            </div>
            <div class="pictable">
              <img src="@/assets/images/pages/registDevice3.jpg" width="100%" />
            </div>
            <div class="mt-5">
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
                    class="mt-5 text-black w-full"
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
                    class="mt-5 text-black w-full"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('input2')"
                    >{{ errors.first("input2") }}</span
                  >

                  <vs-button
                    type="filled"
                    color="#FD5A68"
                    @click.prevent="submitFormRegister"
                    class="mt-5 block w-full"
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
                        <h1><p>Please enter the device ID.</p></h1>
                      </vs-col>
                    </vs-row>
                  </vs-popup>
                </form>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
    <!----------------------------- table -------------------->
    <div class="w-3/4 bg-grid-color h-12 ml-3">
      <vx-card id="cardtabledevice" >
        <div class="boxcenter">
          <div class="pictable">
            <img src="@/assets/images/pages/pic-regist.jpg" width="100%" />
            <vs-divider color="primary"
              ><h4 class="text-primary">List all your devices</h4></vs-divider
            >
            <div>
              <vs-table
                v-model="selected"
                pagination
                search
                max-items="5"
                :data="dataAllDevice"
              >
                <template slot="thead">
                  <vs-th sort-key="device_id" width="40%">ID device</vs-th>
                  <vs-th sort-key="device_name" width="40%">Device name</vs-th>
                  <vs-th width="20%"></vs-th>
                </template>
                <template slot-scope="{ data }">
                  <vs-tr
                    :data="tr"
                    :key="indextr"
                    v-for="(tr, indextr) in data"
                  >
                    <vs-td :data="data[indextr].device_id">
                      {{ data[indextr].device_id }}
                    </vs-td>

                    <vs-td :data="data[indextr].device_name">
                      {{
                        data[indextr].device_name == "undefined" ||
                        data[indextr].device_name == ""
                          ? "-"
                          : data[indextr].device_name
                      }}
                    </vs-td>

                    <vs-td>
                      <div class="flex items-center justify-between">
                        <div class="con-userx flex items-center justify-start">
                          <vs-button
                            color="warning"
                            type="relief"
                            icon="create"
                            @click="
                              popupActive = true;
                              dataAll = data[indextr];
                            "
                          ></vs-button>
                        </div>
                        <vs-col>
                          <vs-row>
                            <div class="text-primary">
                              <vs-button
                                color="red"
                                type="relief"
                                icon="delete"
                                @click="
                                  (popupActive5 = true),
                                    (dataAll = data[indextr])
                                "
                              ></vs-button>
                            </div>
                          </vs-row>
                        </vs-col>

                        <!----------------------- Rename -------------------->
                        <vs-popup
                          classContent="popup-example"
                          :title="`Rename your device ID: ${dataAll.device_id}`"
                          :active.sync="popupActive"
                        >
                          <vs-input
                            class="inputx mb-3"
                            placeholder="New device name"
                            v-model="value1"
                          />
                          <vs-button
                            @click.prevent="submitForm"
                            color="primary"
                            type="filled"
                            >Submit</vs-button
                          >
                          <vs-popup
                            class="holamundo"
                            :title="
                              `Rename your device ID: ${dataAll.device_id}`
                            "
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
                            :title="
                              `Rename your device ID: ${dataAll.device_id}`
                            "
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
                            :title="
                              `Rename your device ID: ${dataAll.device_id}`
                            "
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
                            <vs-col
                              vs-type="flex"
                              vs-justify="center"
                              vs-align="center"
                              vs-w="12"
                            >
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
                              <h2>
                                <p>Do you want to delete this device ID:</p>
                              </h2>
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

                            <vs-col
                              vs-type="flex"
                              vs-justify="center"
                              vs-align="center"
                              vs-w="12"
                            >
                              <div class="flex mb-4">
                                <div
                                  class="w-1/2 px-2 bg-grid-color-secondary h-12"
                                >
                                  <vs-button
                                    @click.prevent="deleteDevice"
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
                        </vs-popup>
                      </div>
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </div>
        </div>
      </vx-card>
    </div>

    <vs-popup title="Delete Device" :active.sync="popupActive6">
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <div>
            <img
              src="@/assets/images/pages/icon-success.png"
              height="120px"
              width="120px"
            />
          </div>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <h1><p>Success!</p></h1>
        </vs-col>
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
export default {
  data: () => ({
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
    // users: [

    // ]
    dataAllDevice: []
  }),
  mounted() {
    if (localStorage.getItem("userIDLogin"))
      this.userLogin = localStorage.getItem("userIDLogin");
    console.log(this.userLogin);

    this.init();
  },
  watch: {
    popupActive(value) {
      console.log(value);
    },
    popupActive2(value) {
      console.log(value);
    }
  },
  methods: {
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

    deleteDevice() {
      this.popupActive5 = false;
      console.log(this.dataAll);
      var body = {
        device_id: this.dataAll.device_id
      };
      this.$axios.post(this.$api_url + "/deleteDevice", body).then(response => {
        console.log(response);
        this.init();
        this.popupActive6 = true;
      });
    },
    submitForm() {
      this.obj = this.dataAllDevice.find(o => o.device_name == this.value1);
      console.log(this.obj);
      console.log(this.dataAll.device_name);
      console.log(this.value1);
      var body = {
        device_id: this.dataAll.device_id,
        device_name: this.value1
      };
      try {
        if (this.value1 == "") {
          this.popupActive = false;
          this.popupActive3 = true;
        } else if (this.value1 == this.dataAll.device_name) {
          this.popupActive = false;
          this.popupActive4 = true;
        } else {
          this.$axios
            .post(this.$api_url + "/editDevice", body)
            .then(response => {
              console.log(response), console.log(response.data.data);
              if (response.data.status == 0) {
                this.popupActive = false;
                this.popupActive4 = true;
              } else {
                this.popupActive = false;
                this.popupActive2 = true;
                this.init();
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
    submitFormRegister() {
      if (this.valueDeviceID == "") {
        this.popupActiveWarning = true;
        this.popupRegist = true;
      } else {
        if (localStorage.getItem("userIDLogin"))
          this.userLogin = localStorage.getItem("userIDLogin");
        console.log(this.userLogin);

        var body = {
          uid: this.userLogin,
          device_id: this.valueDeviceID,
          device_name: this.valueDevicename
        };
        console.log(this.valueDevicename);
        this.$axios
          .post(this.$api_url + "/userRegistDevice", body)
          .then(response => {
            console.log(response), (this.registDevice = response.data.data);
            if (response.data.status == 0) {
              this.popupActiveFail = true;
              this.popupRegist = true;
            } else {
              this.popupActiveSuccess = true;
              this.popupRegist = true;
              this.init();
            }
          });
      }
    }
  }
};
</script>

<style scoped>
.center-div {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ccc;
  border-radius: 3px;
}

#BGmanage {
  height: calc(100vh - 5rem);
  width: 100%;
}

#cardtabledevice {
  height: calc(100vh - 5rem);
 
}

.boxcenter {
  display: flex;
  align-items: center;
  height: calc(100vh - 5rem);
}

#cardBGevice {
  height: calc(100vh - 7rem);
  /* width: 100%; */
}

.pictable {
  height: calc(100vh -50rem);
  width: 100%;
}
</style>

<style lang="scss" scoped>
// #tablesize {
//   height: calc(100vh -10rem);
//   width: 100%;
// }
</style>
