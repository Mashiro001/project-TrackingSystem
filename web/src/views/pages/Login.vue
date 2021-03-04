<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-2/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-4">
                <div class="vx-card__title">
                  <h1 class="text-center text-primary">Tracking system</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-3/5">
              <img src="@/assets/images/pages/registdevice.jpg" width="100%" />
            </div>
          </div>
          <div class="vx-row no-gutter justify-center items-center">
            <div
              class="vx-col sm:w-full md:w-full lg:w-4/5 d-theme-dark-bg mb-4"
            >
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Login to website tracking</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>
                <vs-input
                  v-validate="'required|min:3'"
                  name="email"
                  icon="icon icon-user"
                  icon-pack="feather"
                  label-placeholder="Username"
                  v-model="email"
                  class="w-full no-icon-border"
                />

                <vs-input
                  v-validate="'required|min:6|max:10'"
                  type="password"
                  name="password"
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="Password"
                  v-model="password"
                  class="w-full mt-6 no-icon-border"
                />

                <vs-button
                  color="#E84575"
                  class="float-right mt-5 mb-5 w-full"
                  @click="login"
                  >Login</vs-button
                >
                <br />
              </div>
            </div>
          </div>

          <!-- <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
            <div class="justify-center items-center"><h1>Tracking system</h1></div>
              <img src="@/assets/images/pages/registdevice.jpg" width="100%" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Login to website tracking</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>
                <vs-input
                  v-validate="'required|min:3'"
                  name="email"
                  icon="icon icon-user"
                  icon-pack="feather"
                  label-placeholder="Email"
                  v-model="email"
                  class="w-full no-icon-border"
                />

                <vs-input
                  v-validate="'required|min:6|max:10'"
                  type="password"
                  name="password"
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="Password"
                  v-model="password"
                  class="w-full mt-6 no-icon-border"
                />

                <vs-button
                  color="#E84575"
                  class="float-right mt-5 mb-5"
                  @click="login"
                  >Login</vs-button
                >
                <br />
              </div>
            </div>
          </div> -->
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
// import md5 from "md5";
import md5 from "js-md5";

export default {
  data() {
    return {
      email: "",
      password: "",
      checkbox_remember_me: false,
      colorAlert: "#FD5A68"
    };
  },
  methods: {
    login() {
      if (this.email == "" || this.password == "") {
        this.$vs.notify({
          color: this.colorAlert,
          title: "Warning!",
          text: "Please enter your username and password.",
          position: "top-right"
        });
      } else {
        var body = {
          uid: this.email,
          pwd: md5(this.password)
        };
        this.$axios.post(this.$api_url + "/getOneUser", body).then(response => {
          console.log(response),
            (this.dataOfuser = response.data.data),
            (this.dataDetailofuser = response.data.data);
          console.log(this.dataOfuser);
          if (response.data.status == 0) {
            this.$vs.notify({
              color: this.colorAlert,
              title: "Error!",
              text: "Incorrect username or password, Please try again",
              position: "top-right"
            });
          } else {
            var deviceOfuser = [];
            for (var i = 0; i < this.dataOfuser.length; i++) {
              deviceOfuser.push(this.dataOfuser[i].device_id);
            }

            localStorage.setItem("userIDLogin", this.email);
            localStorage.setItem(
              "deviceUserLogin",
              JSON.stringify(deviceOfuser)
            );
            localStorage.setItem("dataDetail", this.dataOfuser[0].img_user);

            this.$vs.notify({
              title: "Login Success",
              text: "You are logged in!",
              iconPack: "feather",
              icon: "icon-check",
              color: "success",
              position: "top-right"
            });
            this.$router.push("/apps/calendar/realtime");
          }
        });
      }
    },
    loginAuth0() {
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.notifyAlreadyLogedIn();
        return false;
      }
      this.$auth.login({ target: this.$route.query.to });
    },

    // Google login
    loginWithGoogle() {
      this.$store.dispatch("auth/loginWithGoogle", { notify: this.$vs.notify });
    },

    // Facebook login
    loginWithFacebook() {
      this.$store.dispatch("auth/loginWithFacebook", {
        notify: this.$vs.notify
      });
    },

    // Twitter login
    loginWithTwitter() {
      this.$store.dispatch("auth/loginWithTwitter", {
        notify: this.$vs.notify
      });
    },

    // Github login
    loginWithGithub() {
      this.$store.dispatch("auth/loginWithGithub", { notify: this.$vs.notify });
    },

    notifyAlreadyLogedIn() {
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning"
      });
    },
    registerUser() {
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.notifyAlreadyLogedIn();
        return false;
      }
      this.$router.push("/pages/register");
    }
  }
};
</script>

<style lang="scss">
#page-login {
  .social-login {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>

<style scoped>
#pictable {
  text-align: center;
}

.boxcenter3 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
