<template>
  <div>
    <md-dialog :md-active.sync="dialogActive">
        <md-dialog-title>{{ dialogTitle }}</md-dialog-title>

        <md-dialog-content>
          <md-field v-bind:class="{'md-invalid': nameError || errors.has(labelName)}">
            <label>{{ labelName }}</label>
            <md-input v-model="user_name" maxlength="30" :data-vv-name="labelName" data-vv-rules="required" v-validate required></md-input>
            <span class="md-error">{{ nameError? nameErrorMsg: errors.first(labelName) }}</span>
          </md-field>

          <md-field v-bind:class="{'md-invalid': passwordError || errors.has(labelPassword)}">
            <label>{{ labelPassword }}</label>
            <md-input v-model="password" type="password" :data-vv-name="labelPassword" data-vv-rules="required|min:3" v-validate required></md-input>
            <span class="md-error">{{ passwordError? passwordErrorMsg: errors.first(labelPassword) }}</span>
          </md-field>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="register">Sign up</md-button>
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
  name: 'Register',
  methods: {
    showDialog () {
      this.dialogActive = true
    },
    register () {
      this.nameError = false
      this.passwordError = false
      this.$http.post('/auth/user/register', {
        user_name: this.user_name,
        password: this.password
      })
      .then(function (res) {
        if (res.data.success) {
          this.dialogActive = false
          this.$emit('registered', res.data.token)
        } else {
          switch (res.data.info) {
            case constants.USER_EXISTED:
              this.nameError = true
              this.nameErrorMsg = res.data.info
              break
          }
          sessionStorage.setItem(constants.USER_TOKEN, null)
        }
      })
    }
  },
  data () {
    return {
      dialogTitle: 'Join us!',
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
</style>
