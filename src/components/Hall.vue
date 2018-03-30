<template>
  <div class="hall-content">
    <div class="hall-mid md-layout-item md-size-50 md-medium-size-60 md-small-size-90 md-xsmall-size-100">
      <md-content class="output-area md-scrollbar" id="outputarea">
        <div class="msg-label" v-for="(msg, index) of msgContent" :key="index" v-bind:class="{'is-self': msg.user_name == getCurrentUser().name}">
          <md-content>
            <div class="md-caption">{{msg.user_name}}</div>
            <md-chip>{{msg.text}}</md-chip>
          </md-content>
        </div>
      </md-content>
      <div class="input-area">
        <md-field  md-clearable>
          <md-input id="emitInput" v-model="sendData" v-on:keyup.enter="emitText" autofocus></md-input>
        </md-field>
        <md-button @click="emitText">Send</md-button>
      </div>
    </div>
  </div>
</template>

<script>
const constants = require('../../bin/constants')

export default {
  name: 'Hall',
  data () {
    return {
      msg: 'Hall',
      msgContent: [],
      sendData: ''
    }
  },
  created: function () {
    window.addEventListener('keydown', function (e) {
      document.getElementById('emitInput').focus()
    })
    this.$socket.emit(constants.HALL_ENTER, sessionStorage.getItem(constants.USER_TOKEN))
  },
  sockets: {
    connect: function () {
      console.log('Socket connected')
    },
    enter: function (data) {
      console.log('Socket enter')
      console.log(data)
    },
    append: function (data) {
      console.log('Socket append')
      console.log(data)
      this.msgContent.push(data)
      this.$nextTick(function () {
        this.scrollToBottom()
      })
    }
  },
  methods: {
    emitText: function () {
      this.$socket.emit(constants.HALL_APPEND, this.sendData)
      this.sendData = ''
    },
    scrollToBottom: function () {
      var outputarea = document.getElementById('outputarea')
      outputarea.scrollTop = outputarea.scrollHeight
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hall-content {
  min-height: calc(100vh - 112px - 16px);
  display: flex;
  justify-content: center
}
.hall-content .hall-mid {
  display: flex;
  flex-direction: column;
}
.hall-content .hall-mid .output-area{
  flex-grow: 1;
  flex-direction: column;
  height: 1em;
  overflow: auto;
}
.hall-content .hall-mid .output-area .msg-label{
  /* margin: 0.5em; */
  display: flex;
  width: 100%;
}
.hall-content .hall-mid .output-area .msg-label .md-content{
  max-width: 45%;
  padding: 0.5em;
}
.hall-content .hall-mid .output-area .msg-label .md-content .md-chip{
  height: auto;
  width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: normal;
  padding: 0.5em;
  border-radius: 1em;
  line-height: 1.8em;
}
.hall-content .hall-mid .output-area .is-self{
  justify-content: flex-end;
}
.hall-content .hall-mid .input-area{
  display: flex;
  align-items: center;
  /* align-self: flex-end; */
}
.hall-content .hall-mid .input-area .md-field{
  flex: 1;
}



/* .hall-mid {
  min-height: calc(100vh - 112px - 16px);
  display: flex;
  flex-flow: column;
}
.hall-mid .chat-area {
  flex: 1 1 auto;
}
.hall-mid .send-area {
  display: flex;
  align-items: baseline;
}
.hall-mid md-field {
  flex: 1
}
.hall-left, .hall-right {
  background-color:cornsilk
} */
</style>
