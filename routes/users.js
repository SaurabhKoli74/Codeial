const express = require('express');
const router = express.Router();



const usersController = require('../controllers/users_Controller');

router.get('/',usersController.profile)
router.get('/profile',usersController.profile);
module.exports = router;