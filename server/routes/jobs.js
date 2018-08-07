const express = require('express');
const router = express.Router();
const validation = require('../validation/jobs');
const JOB = require('../controller/jobsController');
const authenticate = require('../middlewares/authenticate');

router.get('/',authenticate,JOB.FETCH_JOBS);
module.exports = router;