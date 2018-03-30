<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <!-- <router-link class="md-title" to="/Hall">Avatorcraft</router-link> -->
          </div>

          <account-component ref="account"/>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary" md-sync-route>
            <md-tab id="tab-home" md-label="Home" to="/"></md-tab>
            <md-tab id="tab-pages" md-label="Hall" to="/Hall"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      
      <md-app-content>
        <router-view />
      </md-app-content>

    </md-app>
  </div>
</template>

<script>
import AccountComponent from './components/Account/Account.vue'

export default {
  name: 'app',
  beforeRouteEnter: function (to, from, next) {

  },
  data: function () {
    return {
      menuVisible: false
    }
  },
  watch: {
    showLogin: function (value) {
      if (value) {
        this.$refs.account.showLogin()
        this.$router.replace(this.$router.currentRoute.path)
      }
    }
  },
  computed: {
    showLogin () {
      return (this.$route.query) ? this.$route.query.showLogin : false
    }
  },
  methods: {
    // showLogin: function () {
    //   console.log('ShowLogin')
    // }
  },
  components: {
    AccountComponent
  }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200) // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
