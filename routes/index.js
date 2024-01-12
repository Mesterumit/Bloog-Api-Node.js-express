const router = require('express').Router()

//  router   /api/auth
router.use('/auth', require('./auth'))
// router   api/users
router.use('/users', require('./user'))

module.exports = router