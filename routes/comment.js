const express = require('express')
const router =  express.Router();
const commentController = require('../controllers/comment_controller')
const Passport = require('../config/passport-local-strtegy');
const passport = require('../config/passport-local-strtegy');

router.post('/create-comment', Passport.checkAuthentication,commentController.create)
router.get('/destroy/:id' ,passport.checkAuthentication,commentController.destroy)

module.exports = router;