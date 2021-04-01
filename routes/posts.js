const express = require('express')
const router =  express.Router();
const postController = require('../controllers/posts_controller')
const Passport = require('../config/passport-local-strtegy')

router.post('/create',Passport.checkAuthentication, postController.create)
router.get('/destroy/:id',Passport.checkAuthentication,postController.destroy)

module.exports = router;