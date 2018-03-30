const database = require('../config/database.js')
const userSchema = '../schema/users.js'
const avatorcraft = database.avatorcraft

const user = avatorcraft.import(userSchema)

// sequelize-auto  -h localhost -d avatorcraft.db -e sqlite -c ./sqlite-option.json -o "./schema/"
class UserModel {
  static async get (key) {
    try {
      return await user.findOne({
        where: key
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async push (value) {
    try {
      const result = await user.findOrCreate({
        where: { user_name: value.user_name },
        defaults: value
      })
      return {
        data: result[0].dataValues,
        created: result[1]
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserModel
