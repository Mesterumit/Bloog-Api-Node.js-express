const router = require('express').Router()
const authctrl = require('../controllers/auth')
const { protect } = require('../middlewares/Authentication')


router.post('/register',authctrl.register )
router.post('/login',authctrl.login )
router.all('/logout',authctrl.logout )         
router.put('/details',protect, authctrl.updateDeatils)
router.put('/password',protect, authctrl.updatePassword)



module.exports = router