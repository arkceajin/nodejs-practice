const authController = require('../controllers/auth.js')
const router = require('koa-router')()

// router.get('/user/:id', userController.getUserInfo)
// router.post('/user', userController.postUserAuth)
router.post('/user/login', authController.login)
      .post('/user/register', authController.register)

module.exports = router
