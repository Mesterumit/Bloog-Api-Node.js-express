const router = require('express').Router()
const ctrl = require('../controllers/view')
const { protect } = require('../middlewares/Authentication')




router.route('/')
.get(protect,ctrl.getUserViews)




module.exports = router