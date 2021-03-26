const { localsName } = require('ejs');
const { findById } = require('../models/postSchema');
const Post = require('../models/postSchema');
const Comment = require('../models/commetSchema')


// Funtion to upload new post
module.exports.create = async function (req, res) {
    try {
        if (!req.user) {
            return res.redirect('/user/sign-in');
        }
        let post = await Post.create(
            {
                content: req.body.content,
                user: req.user._id,
                name: req.body.name
            });

        req.flash('success', 'Post Added Successfully')
        return res.redirect('back')
    }
    catch (err) {
        console.log('Error While creating a new post', err)
        return res.redirect('back');
    }

}

// function to delete the post
module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        for (comment of post.comments) {
            let comments = await Comment.findById(comment._id);
            comments.remove();
        }

        // .id means converting the object id into string inbuilt  
        if (post.user == req.user.id) {

            post.remove();
            req.flash('success', 'Post Deleted Successfully')
            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            })

        }
    } catch (err) {
        console.log("Error while deleting the post", err);
        return res.redirect('back');

    }


}