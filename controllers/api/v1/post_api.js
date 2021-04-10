const Post = require('../../../models/postSchema')
const Comment = require('../../../models/commetSchema')
const User = require('../../../models/userSchema')
module.exports.index = async function (req, res) {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

    return res.json(200, {
        message: 'List of posts',
        post: posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        for (comment of post.comments) {
            let comments = await Comment.findById(comment._id);
            comments.remove();
        }
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: 'Post Deleted'
            })
        }
        // .id means converting the object id into string inbuilt  

        post.remove();

        await Comment.deleteMany({ post: req.params.id }, function (err) {
            return res.redirect('back');
        })

    } catch (err) {
        console.log("Error while deleting the post/ Post is already deleted you copy the wrong post-id", err);
        return res.json(500,{
            message : "Internal Server Error"
        })

    }

}