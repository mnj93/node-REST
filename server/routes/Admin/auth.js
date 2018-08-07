const express = require('express');
const router = express.Router();
const validation = require('../../validation/Admin/auth');
const AUTH = require('../../controller/Admin/authController');
const loginChecker = require('../../middlewares/loginCheck');
const authenticate = require('../../middlewares/adminAuthenticate');

router.post('/',validation.validateLogin,AUTH.USER_LOGIN);
router.post('/logout',authenticate,AUTH.USER_LOGOUT);


module.exports = router;