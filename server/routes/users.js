const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const validation = require('../validation/users');
const USER_CONTROLLER = require('../controller/userController');


router.post('/',validation.ValidatePostUser,USER_CONTROLLER.CREATE_USER);



module.exports = router;