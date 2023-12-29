const {Router} = require('express')
const router = new Router()

const controller = require('./authController')
const loginMiddleware = require('./middleware/loginMiddleware')
const authMiddleware = require('./middleware/authMiddleware')

router.post('/login', loginMiddleware, controller.login)

router.post('/auditUsers', authMiddleware, controller.auditUsers)

router.get('/data', authMiddleware, controller.getUsers)
router.get('/adminData', authMiddleware, controller.getAdminData)

module.exports = router