const express = require('express');

const router = express.Router();

const about_Controller = require('../controllers/about_Controller');

router.get('/',about_Controller.about);



module.exports = router;

