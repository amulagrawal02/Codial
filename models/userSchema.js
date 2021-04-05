const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar')
const db = require('../config/mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        avatar: {
            type : String,
            default : (path.join(AVATAR_PATH,'avatar-1617644136897'))
        }

    }, {
    timestamps: true
})


// to store the avatar
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

// static function :- funtion which are avilable through all instance of class object
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar')
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema)

module.exports = User;