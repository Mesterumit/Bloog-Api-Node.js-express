const router = require('express').Router()

//  router   /api/auth
router.use('/auth', require('./auth'))
// router   api/users
router.use('/users', require('./user'))
// router api/categories
router.use('/categories', require('./category') )
// route  api/posts
router.use('/posts', require('./post') )
// route api/profile
router.use('/profile',require('./profile'))

module.exports = router 