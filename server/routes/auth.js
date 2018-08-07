const express = require('express');
const router = express.Router();
const validation = require('../validation/auth');
const AUTH = require('../controller/authController');
const loginChecker = require('../middlewares/loginCheck');

router.post('/',validation.validateLogin,loginChecker.LoginCheck,AUTH.USER_LOGIN);



module.exports = router;