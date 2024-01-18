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
// route api/comments
router.use('/comments', require('./comments'))
//route api/like
router.use('/like', require('./like'))
//route api/view
router.use('/views', require('./views'))
// route  /documents 
router.use('/documents', require('./doc'))

module.exports = router 