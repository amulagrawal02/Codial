const express = require('express')
const router =  express.Router();
const postController = require('../controllers/posts_controller')
const Passport = require('../config/passport-local-strtegy')

router.post('/create',Passport.checkAuthentication, postController.create)

module.exports = router;