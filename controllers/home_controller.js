const Post = require('../models/postSchema');

module.exports.home = function(req,res)
{
   
   Post.find({})
   .populate('user')
   .populate({
      path : 'comments',
      populate: {
         path : 'user'
      }
   })
   .exec(function(err,posts)
   {
      
      return res.render('home',
      {
         title : 'Home',
         posts : posts,
         
      })
   })
     
}


// module.exports.home = function(req,res)
// {
   
//    Post.find({},function(err,posts)
//    {
//       
//    })   
// }