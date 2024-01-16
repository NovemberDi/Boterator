const {Router} = require('express')
const router = new Router()

const controller = require('./authController')
const loginMiddleware = require('./middleware/loginMiddleware')
const authMiddleware = require('./middleware/authMiddleware')

router.get('/link', controller.link)
router.post('/login', loginMiddleware, controller.login)

router.post('/auditUsers', authMiddleware, controller.auditUsers)

router.post('/getUsers', authMiddleware, controller.getUsers)
router.post('/fixUsers', authMiddleware, controller.fixUsers)
router.post('/changeNickname', authMiddleware, controller.changeNickname)

router.get('/adminData', authMiddleware, controller.getAdminData)

module.exports = router