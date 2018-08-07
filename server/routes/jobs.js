const express = require('express');
const router = express.Router();
const validation = require('../validation/jobApplication');
const JOB = require('../controller/jobsController');
const authenticate = require('../middlewares/authenticate');

router.get('/',authenticate,JOB.FETCH_JOBS);
router.post('/:id/apply',authenticate,validation.validateJobApplication,JOB.APPLY_FOR_JOB);
module.exports = router;