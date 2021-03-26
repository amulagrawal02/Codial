const { localsName } = require('ejs')

const Comment = require('../models/commetSchema')
const Post = require('../models/postSchema')

// function to uplad the comment
module.exports.create = async function (req, res) {
    try {
        let post = Post.findById(req.body.post);
        {
            if (post) {
                let CommentCreate = Comment.create(
                    {
                        content: req.body.content,
                        user: req.user._id,
                        post: req.body.post,
                        name: req.body.name
                    });

                post.comments.push(done);
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
module.exports.destroy = function (req, res) {
    try {
        let comment = Comment.findById(req.params.id)
        if (comment.user = req.user._id) {
            let PostId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(PostId, { $pull: { comments: req.params.id } });
            req.flash('success', 'Comment Deleted Successfully!!');
            return res.redirect('back');
        }
        return res.redirect('back')
    } catch (err) {
        console.log("error while deleting the comments", err);
    }


}