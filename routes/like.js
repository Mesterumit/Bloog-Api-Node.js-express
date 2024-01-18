const router = require('express').Router()
const ctrl = require('../controllers/likes')
const { protect} = require('../middlewares/Authentication')



router.route('/')
.post(protect,ctrl.createLike)


router.route('/:id')
.delete(protect, ctrl.remove)

router.get('/:postId/post/', ctrl.getPostLikes)



module.exports = router