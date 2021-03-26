const { localsName } = require('ejs');
const { findById } = require('../models/postSchema');
const Post = require('../models/postSchema');
const Comment = require('../models/commetSchema')


// Funtion to upload new post
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
            req.flash('success' ,'Post Added Successfully')
            return res.redirect('back')

        }
    )
}

// function to delete the post
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
           req.flash('success' ,'Post Deleted Successfully')
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