
const jwt = require('jsonwebtoken')

const globalConstants = require('../../bin/constants')

// 'this' is point to socket 'io' object
class SocketIndex {
  static connected (socket) {
    console.log('Socket connected')
    socket.on('disconnect', function () {
      console.log('Socket disconnect')
    })
    let io = this
    var currentUser
    socket.on(globalConstants.HALL_ENTER, function (data) {
      console.log(globalConstants.HALL_ENTER)
      console.log(jwt.decode(data))
      currentUser = jwt.decode(data)
      if (currentUser) {
        io.emit(globalConstants.HALL_ENTER, {user_name: currentUser.name})
      }
    })
    socket.on(globalConstants.HALL_APPEND, function (data) {
      console.log(globalConstants.HALL_APPEND)
      if (currentUser) {
        io.emit(globalConstants.HALL_APPEND, {user_name: currentUser.name, text: data})
      }
    })
  }
}

module.exports = SocketIndex
