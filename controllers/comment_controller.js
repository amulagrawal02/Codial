const { localsName } = require('ejs')

const Comment = require('../models/commetSchema')
const Post = require('../models/postSchema')

// function to uplad the comment
module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        {
            if (post) {
                let CommentCreate = await Comment.create(
                    {
                        content: req.body.content,
                        user: req.user._id,
                        post: req.body.post,
                        name: req.body.name
                    });
                
                   
                post.comments.push(CommentCreate);
                post.save();
                req.flash('success', 'Comment Added Successfully!!')
                return res.redirect('back')
            }
        }

    } catch (err) {
        console.log("error while upload comment", err);
        return res.redirect('back');
    }

}


// function to delete the comment
module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id)
        if (comment.user = req.user._id) {
            let PostId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(PostId, { $pull: { comments: req.params.id } });
            req.flash('success', 'Comment Deleted Successfully!!');
            return res.redirect('back');
        }
        return res.redirect('back')
    } catch (err) {
        console.log("error while deleting the comments", err);
    }


}