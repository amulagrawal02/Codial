const express = require('express')
const router =  express.Router();
const passport = require('passport');

// require the userController
const userController = require('../controllers/user_controller')
// define the user router
router.get('/',userController.user);

// define the method profile router
router.get('/profile/:id',userController.profile);



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

// routers for update
router.post('/update/:id',userController.updateProfile);
router.get('/update',passport.checkAuthentication,userController.updateForm);

// routers for goolge auth
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);

module.exports = router;

