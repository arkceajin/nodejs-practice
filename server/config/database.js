
const Sequelize = require('sequelize')

const avatorcraft = new Sequelize('avatorcraft.db', null, null, {
  dialect: 'sqlite',
  storage: './avatorcraft.db',
  define: {
    timestamps: false,
    autoIncrement: true
  }
})

module.exports = {
  avatorcraft
}
