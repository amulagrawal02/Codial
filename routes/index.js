const express = require('express')
const router = express.Router();
// import home controller
const homeController = require('../controllers/home_controller');


//Just for checking
console.log('Inside the home functions')


// connect the get with action or function
// connect with homeController
router.get('/',homeController.home)
// connect with user routes
router.use('/user',require('./user'))


module.exports = router;