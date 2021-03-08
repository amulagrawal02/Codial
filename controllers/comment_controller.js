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