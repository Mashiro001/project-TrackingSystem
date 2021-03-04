<!-- =========================================================================================
    File Name: VxSidebar.vue
    Description: Sidebar Component
    Component Name: VxSidebar
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="parentx">
    <vs-sidebar
      v-hammer:swipe.left="onSwipeLeft"
      ref="mainSidebar"
      :parent="parent"
      :hiddenBackground="clickNotClose"
      :reduce="reduce"
      default-index="-1"
      class="sidebarx main-menu-sidebar items-no-padding"
      v-model="isSidebarActive"
      :click-not-close="clickNotClose"
      :reduce-not-rebound="reduceNotRebound"
    >
      <div @mouseenter="sidebarMouseEntered" @mouseleave="sidebarMouseLeave">
        <div
          class="header-sidebar flex items-end justify-between"
          slot="header"
        >
          <div class="logo flex items-center">
            <!-- <img :src="logo" alt="logo" class="w-10 mr-4" v-if="logo"> -->
            <span
              class="logo-text"
              v-show="isMouseEnter || !reduce"
              v-if="title"
              >{{ title }}</span
            >
          </div>

          <div>
            <template v-if="showCloseButton">
              <feather-icon
                icon="XIcon"
                class="m-0 cursor-pointer"
                @click="$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false)"
              ></feather-icon>
            </template>
            <template v-else-if="!showCloseButton && !sidebarItemsMin">
              <feather-icon
                icon="DiscIcon"
                class="mr-0 cursor-pointer"
                svg-classes="stroke-current"
                v-show="!reduce"
                @click="toggleReduce(true)"
                id="btnSidebarToggler"
              ></feather-icon>
              <feather-icon
                icon="CircleIcon"
                class="mr-0 cursor-pointer"
                svg-classes="stroke-current"
                v-show="reduce"
                @click="toggleReduce(false)"
                id="btnSidebarToggler"
              ></feather-icon>
            </template>
          </div>
        </div>

        <div class="shadow-bottom" v-show="showShadowBottom"></div>
        <div id="avatarUser" class="mt-1">
          <vs-avatar
            size="70px"
            class="user-profile-img" 
            :src="user_displayImg == 'null' ? require(`@/assets/images/pages/uploadprofile/default-profile.jpg`) :
            require(`@/assets/images/pages/uploadprofile/${user_displayImg}`)"
          />
          <h4>{{ user_displayName }}</h4>
          <!-- <div><span>Available</span></div> -->
        </div>

        <VuePerfectScrollbar
          ref="mainSidebarPs"
          class="scroll-area--main-sidebar pt-2"
          :settings="settings"
          @ps-scroll-y="psSectionScroll"
        >
          <template v-for="(sidebarItem, index) in sidebarItems">
            <!-- GROUP ITEM HEADER -->
            <span
              :key="`header-${index}`"
              v-if="sidebarItem.header && !sidebarItemsMin"
              class="navigation-header truncate"
              >{{ $t(sidebarItem.i18n) || sidebarItem.header }}</span
            >
            <template v-else-if="!sidebarItem.header">
              <!-- IF IT'S SINGLE ITEM -->
              <vx-sidebar-item
                ref="sidebarLink"
                :key="`sidebarItem-${index}`"
                v-if="!sidebarItem.submenu"
                :index="index"
                :to="sidebarItem.slug != 'external' ? sidebarItem.url : ''"
                :href="sidebarItem.slug == 'external' ? sidebarItem.url : ''"
                :icon="sidebarItem.icon"
                :target="sidebarItem.target"
                :isDisabled="sidebarItem.isDisabled"
              >
                <span v-show="!sidebarItemsMin" class="truncate">{{
                  $t(sidebarItem.i18n) || sidebarItem.name
                }}</span>
                <vs-chip
                  class="ml-auto"
                  :color="sidebarItem.tagColor"
                  v-if="sidebarItem.tag && (isMouseEnter || !reduce)"
                  >{{ sidebarItem.tag }}</vs-chip
                >
              </vx-sidebar-item>

              <!-- IF HAVE SUBMENU / DROPDOWN -->
              <template v-else>
                <vx-sidebar-group
                  ref="sidebarGrp"
                  :key="`group-${index}`"
                  :openHover="openGroupHover"
                  :group="sidebarItem"
                  :groupIndex="index"
                  :open="isGroupActive(sidebarItem)"
                ></vx-sidebar-group>
              </template>
            </template>
          </template>
        </VuePerfectScrollbar>
      </div>
      <div class="footer-sidebar" slot="footer">
        <vs-button
          size="medium"
          @click="logout()"
          icon="logout"
          color="danger"
          type="flat"
          >{{ reduce == true ? " " : "log out" }}</vs-button
        >
      </div>
    </vs-sidebar>
    <div
      v-hammer:swipe.right="onSwipeRightSidebarSwipeArea"
      v-if="!isSidebarActive"
      class="sidebar-swipe-area"
      id="sidebar-swipe-area"
    ></div>
    <vs-popup
      classContent="popup-example"
      title="Logout"
      :active.sync="popupActive5"
      id="askofLogout"
    >
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <div>
            <img
              src="@/assets/images/pages/exit.png"
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
          <h2><p>Do you want to logout?</p></h2>
        </vs-col>

        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <div class="flex mb-4">
            <div class="w-1/2 px-2 bg-grid-color-secondary h-12">
              <vs-button
                @click="
                  logout();
                "
                color="success"
                type="filled"
                >Yes</vs-button
              >
            </div>
            <div class="w-1/2 px-2 bg-grid-color h-12">
              <vs-button
                @click="popupActive5 = false"
                color="#878787"
                type="filled"
                >No</vs-button
              >
            </div>
          </div>
        </vs-col>
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
// import firebase from 'firebase/app'
import "firebase/auth";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VxSidebarGroup from "./VxSidebarGroup.vue";
import VxSidebarItem from "./VxSidebarItem.vue";

export default {
  name: "vx-sidebar",
  props: {
    sidebarItems: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    logo: {
      type: String
    },
    parent: {
      type: String
    },
    openGroupHover: {
      type: Boolean,
      default: false
    },
    reduceNotRebound: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    popupActive5: false,
    clickNotClose: false, // disable close sidebar on outside click
    reduce: false, // determines if sidebar is reduce - component property
    showCloseButton: false, // show close button in smaller devices
    isMouseEnter: false,
    settings: {
      // perfectscrollbar settings
      maxScrollbarLength: 60,
      wheelSpeed: 1,
      swipeEasing: true
    },
    windowWidth: window.innerWidth, //width of windows
    showShadowBottom: false
  }),
  computed: {
    // PROFILE
    user_displayName() {
      return localStorage.getItem("userIDLogin");
    },

    user_displayImg(){
      return localStorage.getItem("dataDetail");
      
    },
    activeUserImg() {
      return (
        JSON.parse(localStorage.getItem("userInfo")).photoURL ||
        this.$store.state.AppActiveUser.img
      );
    },
    isSidebarActive: {
      get() {
        return this.$store.state.isSidebarActive;
      },
      set(val) {
        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", val);
      }
    },
    reduceSidebar() {
      return Boolean(this.reduce && this.reduceButton);
    },
    reduceButton: {
      get() {
        return this.$store.state.reduceButton;
      },
      set(val) {
        this.$store.commit("TOGGLE_REDUCE_BUTTON", val);
      }
    },
    sidebarItemsMin() {
      return this.$store.state.sidebarItemsMin;
    },
    isGroupActive() {
      return sidebarItem => {
        const path = this.$route.fullPath;
        let open = false;
        let func = function(sidebarItem) {
          if (sidebarItem.submenu) {
            sidebarItem.submenu.forEach(item => {
              if (path == item.url) {
                open = true;
              } else if (item.submenu) {
                func(item);
              }
            });
          }
        };
        func(sidebarItem);
        return open;
      };
    }
  },
  watch: {
    reduce(val) {
      if (val == true) {
        this.$store.dispatch("updateSidebarWidth", "reduced");
      } else {
        this.$store.dispatch("updateSidebarWidth", "default");
      }

      setTimeout(function() {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    },
    reduceButton() {
      this.setSidebarWidth();
    },
    $route() {
      if (this.isSidebarActive && this.showCloseButton)
        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", false);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("userIDLogin");
      localStorage.removeItem("deviceUserLogin");
      this.$router.replace("/pages/login");
    this.popupActive5 = false
    },
    // logout() {
    //     this.popupActive5 = false;
    //     // if user is logged in via auth0
    //     if (this.$auth.profile) this.$auth.logOut();

    //     // if user is looged in via firebase
    //     const firebaseCurrentUser = firebase.auth().currentUser

    //     if (firebaseCurrentUser) {
    //         firebase.auth().signOut().then(() => {
    //             this.$router.push('/pages/login')
    //             localStorage.removeItem('userInfo');
    //         })
    //     }
    //     // Change role on logout. Same value as initialRole of acj.js
    //     this.$acl.change('admin')
    //     localStorage.removeItem('userRole');
    // },
    sidebarMouseEntered() {
      if (this.reduce) this.$store.commit("UPDATE_SIDEBAR_ITEMS_MIN", false);
      this.isMouseEnter = true;
    },
    sidebarMouseLeave() {
      if (this.reduce) {
        this.$store.commit("UPDATE_SIDEBAR_ITEMS_MIN", true);
      }
      this.isMouseEnter = false;
    },
    toggleReduce(val) {
      this.reduceButton = val;
      this.setSidebarWidth();
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        if (this.windowWidth < 992)
          this.$store.commit("UPDATE_WINDOW_BREAKPOINT", "md");
        else this.$store.commit("UPDATE_WINDOW_BREAKPOINT", "lg");

        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", false);
        if (this.reduceButton) this.reduce = false;
        // this.reduceButton = false;
        this.showCloseButton = true;
        this.clickNotClose = false;
        this.$store.dispatch("updateSidebarWidth", "no-sidebar");
        this.$store.commit("UPDATE_SIDEBAR_ITEMS_MIN", false);
      } else {
        this.$store.commit("UPDATE_WINDOW_BREAKPOINT", "xl");
        if (this.reduceButton) this.reduce = true;
        else this.reduce = false;

        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", true);
        if (this.reduceButton && !this.isMouseEnter)
          this.$store.commit("UPDATE_SIDEBAR_ITEMS_MIN", true);
        else this.$store.commit("UPDATE_SIDEBAR_ITEMS_MIN", false);

        this.clickNotClose = true;
        this.showCloseButton = false;
        if (this.reduceSidebar)
          this.$store.dispatch("updateSidebarWidth", "reduced");
        else this.$store.dispatch("updateSidebarWidth", "default");
      }
    },
    psSectionScroll() {
      if (this.$refs.mainSidebarPs.$el.scrollTop > 0)
        this.showShadowBottom = true;
      else this.showShadowBottom = false;
    },
    onSwipeLeft() {
      if (this.isSidebarActive && this.showCloseButton)
        this.isSidebarActive = false;
    },
    onSwipeRightSidebarSwipeArea() {
      if (!this.isSidebarActive && this.showCloseButton)
        this.isSidebarActive = true;
    }
  },
  components: {
    VxSidebarGroup,
    VxSidebarItem,
    VuePerfectScrollbar
  },
  mounted() {
    localStorage.getItem("userIDLogin");
    // localStorage.getItem("dataDetail")
    // console.log(localStorage.getItem("dataDetail"))
    // this.userdetail = 
    //      localStorage.getItem("dataDetail")
    //     console.log(this.userdetail);

    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.setSidebarWidth();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  }
};
</script>

<style lang="scss">
#askofLogout {
  z-index: 530000000;
}
.footer-sidebar2 {
  .footer-sidebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    > button {
      border: 0px solid rgba(0, 0, 0, 0) !important;
      border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
      border-radius: 0px !important;
    }
  }
}

@import "@/assets/scss/vuesax/components/vxSidebar.scss";
</style>

<style scoped>
#avatarUser {
  text-align: center;
}
</style>
