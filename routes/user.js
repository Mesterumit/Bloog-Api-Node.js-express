const router = require('express').Router()
const ctrl = require('../controllers/users')
const { protect, authorize } = require('../middlewares/Authentication')
const query = require('../middlewares/query')
const User = require('../models/User')


// admin have to be logged in with "router.use(protect)"
router.use(protect)
//  user has to be an admin
router.use(authorize('admin'))

router.route('/')
.get(query(User),ctrl.list)
.post(ctrl.create)


router.route('/:id')
.get(ctrl.read)
.put(ctrl.update)
.delete(ctrl.delete)

router.route('/:id/posts').get(protect,ctrl.usersPost)



module.exports = router