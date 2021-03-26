const { localsName } = require('ejs')

const Comment = require('../models/commetSchema')
const Post = require('../models/postSchema')

// function to uplad the comment
module.exports.create = function(req,res)
{
    
    Post.findById(req.body.post,function(err,post)
    {
        if(post)
        {
            Comment.create(
                {
                    content : req.body.content,
                    user : req.user._id,
                    post : req.body.post,
                    name : req.body.name
                },function(err,done)
                {
                    if(err)
                    {
                        console.log('Error while save comment in DB')
                        return ;
                    }

                    post.comments.push(done);
                    post.save();
                    req.flash('success' ,'Comment Added Successfully')
                    return res.redirect('back')
                }
            )
        }
    })
 
}


// function to delete the comment
module.exports.destroy = function(req,res)
{
    Comment.findById(req.params.id, function(err, comment)
    {
       
        if(err)
        {
            console.log("Error during deleting the comment");
            return res.redirect('back');
        }
        else
        {
            if(comment.user = req.user._id)
            {
                let PostId = comment.post;
                comment.remove();
                Post.findByIdAndUpdate(PostId,{ $pull: {comments : req.params.id}}, function(err,post) {
                    if(err)
                    {
                        console.log('Error while deleting the comment');
                        return res.redirect('back');
                    }
                    req.flash('success' ,'Comment Deleted Successfully')
                    return res.redirect('back');
                })
            
            }
            else{
                return res.redirect('back')
            }
        }
    })
}