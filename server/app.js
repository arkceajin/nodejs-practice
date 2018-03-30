const Koa = require('koa')
const router = require('koa-router')()
const json = require('koa-json')
const logger = require('koa-logger')
const path = require('path')
const serve = require('koa-static')
const historyApiFallback = require('koa-history-api-fallback')
const bodyParser = require('koa-bodyparser')

// const jwt = require('koa-jwt')

const auth = require('./routes/auth.js')
const globalConstants = require('../bin/constants.js')

const port = parseInt(globalConstants.SERVER_PORT, 10)

const app = new Koa()

app.use(bodyParser())
app.use(json())
app.use(logger())
app.use(historyApiFallback())

app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Unauthorized request'
      }
    } else {
      throw err
    }
  }
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

// Static resources
app.use(serve(path.resolve('../dist')))

router.use('/auth', auth.routes())
// router.use('/api', jwt({secret: constants.TokenKey}), api.router)

app.use(router.routes())

const http = app.listen(port, function () {
  console.log('Koa listerning in', port)
})

// SocketIO init
const socketIo = require('socket.io')
const socketIndex = require('./socket/index')
const io = socketIo.listen(http)

io.on('connection', socketIndex.connected)

module.exports = app
