const userModel = require('../models/user.js')

class UserController {
  static async getUserInfo (ctx) {
    ctx.body = await userModel.get({id: ctx.params.id})
  }
}

module.exports = UserController
