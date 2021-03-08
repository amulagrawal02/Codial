const mongoose = require('mongoose');
const { user } = require('../controllers/user_controller');
const { post } = require('../routes');

const commentSchema = new mongoose.Schema(
    {
        content : {
            type : String,
            required : true
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        post : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'

        },
        name : {
            type : String,
            ref : 'User'
        }

      
    },{
        timestamps: true
    }
)

const Comment = mongoose.model('comments',commentSchema)

module.exports = Comment;