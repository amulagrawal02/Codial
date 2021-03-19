const { localsName } = require('ejs')

const Comment = require('../models/commetSchema')
const Post = require('../models/postSchema')

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
                    return res.redirect('back')
                }
            )
        }
    })
 
}

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
                    return res.redirect('back');
                })
            
            }
            else{
                return res.redirect('back')
            }
        }
    })
}