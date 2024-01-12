const router = require('express').Router()
const ctrl = require('../controllers/users')
const { protect, authorize } = require('../middlewares/Authentication')


// admin have to be logged in with "router.use(protect)"
router.use(protect)
//  user has to be an admin
router.use(authorize('admin'))

router.route('/')
.get(ctrl.list)
.post(ctrl.create)


router.route('/:id')
.get(ctrl.read)
.put(ctrl.update)
.delete(ctrl.delete)



module.exports = router