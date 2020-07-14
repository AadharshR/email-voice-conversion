const  express = require( 'express');

const  usersController = require('../controllers/usersController');
const adminController = require('../controllers/adminController')
const router = express.Router();

// users Routes

router.post('/auth/signup', usersController.createUser);
router.post('/auth/signin', usersController.siginUser);

module.exports =  router;