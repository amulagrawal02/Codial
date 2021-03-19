const { localsName } = require('ejs');
const { findById } = require('../models/postSchema');
const Post = require('../models/postSchema');
const Comment = require('../models/commetSchema')

module.exports.create = function(req,res)
{
    if(!req.user)
    {
        return res.redirect('/user/sign-in');
    }
    Post.create(
        {
            content : req.body.content,
            user : req.user._id,
            name : req.body.name
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

module.exports.destroy = function(req,res)
{
    Post.findById(req.params.id,function(err,post)
    {
       
        for(comment of post.comments)
        {
            Comment.findById(comment._id,function (err,comments) {
                comments.remove();
            })
        }

        // .id means converting the object id into string inbuilt  
        if(post.user == req.user.id)
        {

           post.remove();
           Comment.deleteMany({post : req.params.id},function(err)
           {
               return res.redirect('back');
           })
           
        }
        else
        {
            console.log("Error while deleting")
            return res.redirect('back')
        }

    })
}