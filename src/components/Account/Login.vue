<template >
  <div>
    <md-dialog :md-active.sync="dialogActive">
        <md-dialog-title>{{ dialogTitle }}</md-dialog-title>

        <md-dialog-content>
          <md-field v-bind:class="{'md-invalid': nameError || errors.has(labelName)}">
            <label>{{ labelName }}</label>
            <md-input v-model="user_name" maxlength="30" :data-vv-name="labelName" data-vv-rules="required" v-validate></md-input>
            <span class="md-error">{{ nameError? nameErrorMsg: errors.first(labelName) }}</span>
          </md-field>

          <md-field v-bind:class="{'md-invalid': passwordError || errors.has(labelPassword)}">
            <label>{{ labelPassword }}</label>
            <md-input v-model="password" type="password" :data-vv-name="labelPassword" data-vv-rules="required|min:3" v-validate></md-input>
            <span class="md-error">{{ passwordError? passwordErrorMsg: errors.first(labelPassword) }}</span>
          </md-field>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="signIn">Sign in</md-button>
        </md-dialog-actions>
    </md-dialog>

    <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="snackbarActive" md-persistent>
      <span>{{snackbarMsg}}</span>
      <md-button class="md-primary" @click="snackbarActive = false">Close</md-button>
    </md-snackbar>
  </div>
</template>

<script>
const constants = require('../../../bin/constants')

export default {
  name: 'Login',
  methods: {
    showDialog () {
      this.dialogActive = true
    },
    showLoggedIn (name) {
      this.snackbarMsg = 'Welcome ' + name
      this.snackbarActive = true
      this.dialogActive = false
      this.password = ''
    },
    signIn () {
      this.nameError = false
      this.passwordError = false
      this.$http.post('/auth/user/login', {
        user_name: this.user_name,
        password: this.password
      })
      .then(function (res) {
        if (res.data.success) {
          this.$emit('logged-in', res.data.token)
        } else {
          switch (res.data.info) {
            case constants.USER_NOUT_FOUND:
              this.nameError = true
              this.nameErrorMsg = res.data.info
              break
            case constants.WRONG_PASSWORD:
              this.passwordError = true
              this.passwordErrorMsg = res.data.info
              break
          }
          // sessionStorage.removeItem(constants.USER_TOKEN)
        }
      }, () => {
        this.snackbarActive = true
        this.snackbarMsg = 'Bad request'
        // sessionStorage.removeItem(constants.USER_TOKEN)
      })
    }
  },
  data () {
    return {
      dialogTitle: 'Sign in',
      labelName: 'Name',
      labelPassword: 'Password',
      nameErrorMsg: 'User not found',
      passwordErrorMsg: 'Wrong password',
      snackbarMsg: '',
      user_name: '',
      password: '',
      dialogActive: false,
      nameError: false,
      passwordError: false,
      snackbarActive: false,
      duration: 2000
    }
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

/* .signIn .form-control:focus {
  z-index: 2;
}
.signIn input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.signIn input[type="password"] {
  margin-bottom: 2em;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

@media screen and (min-width: 1000px){
  .signIn {
    width: 40%
  }
} */
</style>
