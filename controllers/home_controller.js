const Post = require('../models/postSchema');
const User = require('../models/userSchema');

module.exports.home = async function (req, res) {

   try {
      let posts = await Post.find({})
         .populate('user')
         .populate({
            path: 'comments',
            populate: {
               path: 'user'
            }
         })
      let users = await User.find({});

      return res.render('home',
         {
            title: 'Home',
            posts: posts,
            all_users: users

         })

   }
   catch (err) {
      console.log('Error' , err);
      return res.redirect('back');
    }



}


