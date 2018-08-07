const express = require('express');
const router = express.Router();
const validation = require('../../validation/Admin/jobs');
const JOB = require('../../controller/Admin/jobController');
const loginChecker = require('../../middlewares/loginCheck');
const authenticate = require('../../middlewares/adminAuthenticate');

router.post('/',authenticate,validation.ValidatePostJob,JOB.POST_NEW_JOB);
router.get('/',authenticate,JOB.FETCH_JOBS);
router.get('/applications',authenticate,JOB.FETCH_JOB_APPLICATIONS);
module.exports = router;