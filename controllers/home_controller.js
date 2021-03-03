const Post = require('../models/postSchema');

module.exports.home = function(req,res)
{
   
   Post.find({},function(err,posts)
   {
      return res.render('home',
      {
         title : 'Home',
         posts : posts,
         user : req.user
      })
   })   
}