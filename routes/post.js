const router = require('express').Router()
const ctrl = require('../controllers/post')
const { protect, isAdminOrOwner } = require('../middlewares/Authentication')
const query = require('../middlewares/query')
const Post = require('../models/Post')
const upload = require('../middlewares/upload')


//  have to be logged in with "router.use(protect)"
// router.use(protect)
//  user has to be an admin
// router.use(authorize('admin'))

router.route('/')
.get(query(Post, 'author category'),ctrl.list)
// <input type='file' name="image" />// "name in the "single" has to be same as "name" in input "
.post(protect,upload.single('image'),ctrl.create)

 
router.route('/:id')
.get(protect,ctrl.read)
.put(protect,isAdminOrOwner(Post, 'author'),upload.single('image'),ctrl.update)
.delete(protect, isAdminOrOwner(Post, 'author'), ctrl.delete)



module.exports = router