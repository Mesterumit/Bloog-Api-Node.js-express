const router = require('express').Router()
const ctrl = require('../controllers/comments')
const { protect, authorize, isAdminOrOwner } = require('../middlewares/Authentication')
const query = require('../middlewares/query')
const Comment = require('../models/Comment')




router.route('/')
.get(protect, authorize('admin'),query(Comment),ctrl.list)
.post(protect,ctrl.create)


router.route('/:id')
.get(ctrl.read)
.put(protect, isAdminOrOwner(Comment, 'userId')  ,ctrl.update)
.delete(protect, isAdminOrOwner(Comment, 'userId'), ctrl.delete)


router.get('/:postId/post', ctrl.getPostComments)

module.exports = router