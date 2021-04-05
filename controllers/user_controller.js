const User = require('../models/userSchema');
const { patch } = require('../routes');
const fs = require('fs')
const path = require('path')
// for profile router function
module.exports.profile = async function (req, res) {
    try {
        let ProfileUser = await User.findById(req.params.id);
        return res.render('userProfile', {
            title: ProfileUser.name,
            ProfileUser: ProfileUser
        })

    }
    catch (err) {
        console.log('Error in finding the user in profile function', err)
        return res.redirect('back');
    }



}
// user router function
module.exports.user = function (req, res) {
    return res.send('User page');
}

// signIn fucntion
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect(`/user/profile/${req.user._id}`)
    }
    return res.render('user_sign_in', {
        title: 'Codeial | SignIn'
    })
}

// signUp function
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        console.log(req.user)
        return res.redirect(`/user/profile/${req.user._id}`)
    }
    return res.render('user_sign_up', {
        title: 'Codeial | SignUp'
    })
}


// function to create the new user
module.exports.create = async function (req, res) {

    try {
        if (req.body.password != req.body.confirmpassword) {
            req.flash('error', 'Password Not match')
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            let user = await User.create(req.body);
            req.flash('success', 'User Create Successfully')
            return res.redirect('sign-in');

        }

        else {

            req.flash('error', 'Email is already registor')
            return res.redirect('back')
        }

    } catch (err) {
        console.log('error while sign-in', err);
        return res.redirect('/back')
    }



}

// Function to create session
module.exports.createSession = function (req, res) {
    req.flash('success', 'Log-In Successfully')
    return res.redirect('/')
}

// funtion for user sign-out
module.exports.signOut = function (req, res) {

    req.logout();
    req.flash('success', 'Log-Out Successfully')
    return res.redirect('/user/sign-in');

}

// Function to update the profile name of the user
module.exports.updateProfile = async function (req, res) {

    if (req.user.id == req.params.id) {
        try {
            let UserFind = await User.findById(req.params.id);




            // let updateProfile = await User.findByIdAndUpdate(req.params.id, { $set: { name: req.body.Chaname } });
            // req.flash('success', 'Profile Updated!')
            // return res.redirect('back');

            User.uploadedAvatar(req, res, function (err) {
                console.log(req.body)
                if (err) {
                    console.log(err)
                }
                if (req.body.password != req.body.confirmPassword) {

                    req.flash('error', 'Password is not same as confirmPassword!');
                    return res.redirect('back');

                }
                if (req.body.password != UserFind.password) {
                    req.flash('error', 'Password Not Match!')
                    return res.redirect('back');
                }

                if (req.file) {
                    console.log("req.file")
                    if (UserFind.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', UserFind.avatar))
                    }
                    UserFind.avatar = User.avatarPath + '/' + req.file.filename;

                }

                UserFind.save();
                req.flash("success",'Updated SuccessFully!')
                return res.redirect('/')
            })

        } catch (err) {
            console.log('Error in Upadting the profile', err);
            return res.redirect('back');
        }
    }
    else {
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }

}

// funtion when user click on the update option i.e. update form
module.exports.updateForm = function (req, res) {

    res.render('UpdateForm', {
        title: 'Update'
    });
}

