const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../models/user.js')
const constants = require('../config/constants')
const globalConstants = require('../../bin/constants')

class AuthController {
  static async login (ctx) {
    const data = ctx.request.body
    const userInfo = await userModel.get({user_name: data.user_name})

    if (userInfo != null) {
      if (!bcryptjs.compareSync(data.password, userInfo.password)) {
        ctx.body = {
          success: false,
          info: globalConstants.WRONG_PASSWORD
        }
      } else {
        const userToken = {
          id: userInfo.id,
          name: userInfo.user_name
        }
        ctx.body = {
          success: true,
          token: jwt.sign(userToken, constants.TokenKey)
        }
      }
    } else {
      ctx.body = {
        success: false,
        info: globalConstants.USER_NOUT_FOUND
      }
    }
  }

  static async register (ctx) {
    const data = ctx.request.body
    const hash = bcryptjs.hashSync(
      data.password,
      10
    )
    const user = await userModel.push({
      user_name: data.user_name,
      password: hash
    })
    if (user.created) {
      const userToken = {
        id: user.data.id,
        name: user.data.user_name
      }
      ctx.body = {
        success: true,
        token: jwt.sign(userToken, constants.TokenKey)
      }
    } else {
      ctx.body = {
        success: false,
        info: globalConstants.USER_EXISTED
      }
    }
  }
}

module.exports = AuthController
