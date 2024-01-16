const router = require('express').Router()
const ctrl  = require('../controllers/Profile')
const upload = require('../middlewares/upload')
const { protect, isAdminOrOwner } = require('../middlewares/Authentication')
const Profile = require('../models/Profile')

router.use(protect)

router.route('/')
.get(ctrl.list)
.post(upload.single('image') ,ctrl.create)



router.route('/:id')
.get( ctrl.read)
.put(isAdminOrOwner(Profile, 'userId'),upload.single('image'), ctrl.update)
.delete(isAdminOrOwner(Profile, 'userId'), ctrl.update)

module.exports = router