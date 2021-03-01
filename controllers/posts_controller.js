const { localsName } = require('ejs');
const Post = require('../models/postSchema');

module.exports.create = function(req,res)
{
    if(!req.user)
    {
        return res.redirect('/user/sign-in');
    }
    Post.create(
        {
            content : req.body.content,
            user : req.user.__id
        },function(err,post)
        {
            if(err)
            {
                console.log("error in posting")
                return ;
            }
            return res.redirect('back')

        }
    )
}