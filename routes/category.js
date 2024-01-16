const router = require('express').Router()
const ctrl = require('../controllers/category')
const { protect, authorize } = require('../middlewares/Authentication')
const query = require('../middlewares/query')
const Category = require('../models/Category')


// admin have to be logged in with "router.use(protect)"
router.use(protect)
//  user has to be an admin
router.use(authorize('admin'))

router.route('/')
.get(query(Category),ctrl.list)
.post(ctrl.create)


router.route('/:id')
.get(ctrl.read)
.put(ctrl.update)
.delete(ctrl.delete)



module.exports = router