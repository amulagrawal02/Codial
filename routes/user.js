const express = require('express')
const router =  express.Router();
const passport = require('passport');
// require the userController
const userController = require('../controllers/user_controller')
// define the user router
router.get('/',userController.user);

// define the method profile router
router.get('/profile',passport.checkAuthentication,userController.profile);

//define the user edit router
router.get('/edit',userController.edit);

// define the user signIn router
router.get('/sign-in',userController.signIn)

// define the user signUp router
router.get('/sign-up',userController.signUp)

// define for create route for signUp 
router.post('/create',userController.create)

// define for create-session for signIn function
router.post('/create-session',passport.authenticate(
    'local',{
        failureRedirect: ('/user/sign-in')
    }
),userController.createSession);

// define for signout function
router.get('/sign-out',userController.signOut)

module.exports = router;