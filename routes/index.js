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
router.use('/users',require('./user'))

router.use('/posts', require('./posts'))

router.use('/comment',require('./comment'))

// connect with api routes
router.use('/api',require('./api'))


module.exports = router;