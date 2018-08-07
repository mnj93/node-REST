const express = require('express');
const router = express.Router();
const validation = require('../validation/auth');
const AUTH = require('../controller/authController');
const loginChecker = require('../middlewares/loginCheck');
const authenticate = require('../middlewares/authenticate');

router.post('/',validation.validateLogin,loginChecker.LoginCheck,AUTH.USER_LOGIN);
router.post('/logout',authenticate,AUTH.USER_LOGOUT);


module.exports = router;