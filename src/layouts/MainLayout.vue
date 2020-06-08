<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary glossy text-white">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-dialog v-model="isDisconnected" persistent dense>
          <logincard></logincard>
        </q-dialog>
        <q-toolbar-title>
          {{ currentRouteName }}
        </q-toolbar-title>

        <div>
          <img src="~assets/logofull.png" style="width:30vw;max-width:150px;" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      bordered
      :breakpoint="600"
    >
      <q-item class="glossy q-pa-md">
        <q-item-section avatar>
          <q-avatar size="lg" color="blue" text-color="white"
            >{{ CurrentUserFullname.getInitials() }}
            <q-badge v-if="isDisconnected" color="red" floating>D</q-badge>
            <q-badge v-else color="lime" floating>C</q-badge>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ CurrentUserFullname }}</q-item-label>
          <q-item-label caption>
            Administrator
          </q-item-label>
        </q-item-section>
        <q-item-section v-if="isConnected" side avatar>
          <q-icon class="q-pr-md" name="exit_to_app" />
        </q-item-section>
      </q-item>

      <q-separator />
      <q-item class="fixed-bottom glossy">
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
        <q-menu auto-close>
          <q-list style="min-width: 100px">
            <q-item
              v-for="item in settingitems"
              :key="item.title"
              :to="item.link"
              exact
              clickable
              active-class="my-setting-link"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>

      <q-list>
        <q-item
          v-for="item in menuitems"
          :key="item.title"
          :to="item.link"
          exact
          clickable
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ item.title }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="transparent">
      <div class="q-pa-none  ">
        <q-btn
          size="sm"
          color="negative"
          icon="notifications"
          label="ALARM LIST"
          class="glossy"
          rounded
          @click="isAlarmListOpen = !isAlarmListOpen"
        />
        <alarmlist v-if="isAlarmListOpen"></alarmlist>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MainLayout",
  data() {
    return {
      isAlarmListOpen: false,
      leftDrawerOpen: false,
      loginWindowOpen: true,
      menuitems: [
        {
          title: "Dashboard",
          icon: "dashboard",
          link: "/"
        },
        {
          title: "Medium Voltage",
          icon: "power",
          link: "/mediumvoltage"
        },
        {
          title: "Lighting",
          icon: "wb_incandescent",
          link: "/lighting"
        },
        {
          title: "Ventilation",
          icon: "toys",
          link: "/ventilation"
        }
      ],
      settingitems: [
        {
          title: "General Settings",
          icon: "info",
          link: "/"
        },
        {
          title: "User Management",
          icon: "people",
          link: "/usermanagement"
        },
        {
          title: "Project Management",
          icon: "perm_media",
          link: "/projectmanagement"
        },
        {
          title: "Alarm Management",
          icon: "notification_important",
          link: "/ventilation"
        }
      ]
    };
  },
  components: {
    logincard: require("components/LoginCard").default,
    alarmlist: require("components/AlarmList").default
  },
  computed: {
    ...mapGetters("auth", [
      "isConnected",
      "isDisconnected",
      "CurrentUser",
      "CurrentUserFullname"
    ]),

    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>
<style lang="sass">
.my-setting-link
  color: white
  background: #F2C037
.my-menu-link
  color: white
  background: #26A69A
</style>
