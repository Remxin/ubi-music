const { Router } = require('express')
const authControllers = require('../controllers/authControllers')

const router = Router()

router.post('/login', authControllers.login)
router.post('/signup', authControllers.signup)
router.get('/logout', authControllers.logout)
router.get('/verifyuser', authControllers.verifyuser)


module.exports = router