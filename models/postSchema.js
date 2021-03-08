const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name : {
            type : String,
            ref : 'User'
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comments' 
            }
        ]
    }, {
    timestamps: true
}
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post; 