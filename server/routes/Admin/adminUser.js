const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const validation = require('../../validation/Admin/admin');
const ADMIN_CONTROLLER = require('../../controller/Admin/adminController');


router.post('/',validation.ValidatePostUser,ADMIN_CONTROLLER.CREATE_ADMIN);

module.exports = router;