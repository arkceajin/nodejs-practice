<template >
  <div class="md-toolbar-section-end" >
    <div v-show="loggedIn">
      <md-menu md-size="medium" md-align-trigger>
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>account_circle</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item>Profile</md-menu-item>
          <md-menu-item @click="signOut">Sign out</md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>

    <div v-show="!loggedIn">
      <md-button @click="showLogin">
        Log in
      </md-button>

      <md-button class="md-raised" @click="showRegister">
        Sign up
      </md-button>
    </div>

    <login-component ref="login" v-on:logged-in="loggedInSlot"/>
    <register-component ref="register" v-on:registered="registeredSlot"/>
  </div>
</template>

<script>
import LoginComponent from './Login.vue'
import RegisterComponent from './Register.vue'

export default {
  methods: {
    signOut () {
      this.setCurrentUser(null)
      this.loggedIn = false
      this.$router.push('/')
    },
    showLogin () {
      this.$refs.login.showDialog()
    },
    showRegister () {
      this.$refs.register.showDialog()
    },
    loggedInSlot (token) {
      this.setCurrentUser(token)
      this.loggedIn = true
      this.$refs.login.showLoggedIn(this.getCurrentUser().name)
      this.$router.push('/Hall')
    },
    registeredSlot (token) {
      this.setCurrentUser(token)
      this.loggedIn = true
      this.$refs.login.showLoggedIn(this.getCurrentUser().name)
    }
  },
  name: 'Account',
  data () {
    return {
      loggedIn: this.getCurrentUser() !== null
    }
  },
  components: {
    LoginComponent,
    RegisterComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
