const User = require('../models/userSchema');

// for profile router function
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, ProfileUser) {
        return res.render('userProfile', {
            title: ProfileUser.name,
            ProfileUser: ProfileUser
        })
    })

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

// user edit function
module.exports.edit = function (req, res) {
    return res.send('User edit page')
}

module.exports.create = function (req, res) {

    if (req.body.password != req.body.confirmpassword) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding out the email', err)
            return res.redirect('back');
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('Error in creating the email')
                    return res.redirect('back');
                }
                return res.redirect('sign-in');

            })
        }
        else {

            return res.redirect('back')
        }

    })

}

module.exports.createSession = function (req, res) {
    return res.redirect('/')
}

module.exports.signOut = function (req, res) {


    res.clearCookie('codeail')
    return res.redirect('/user/sign-in');
}

module.exports.updateProfile = function (req, res) {

    User.findById(req.params.id, function (err, UserFind) {
        console.log(UserFind);
        console.log("Inside the user statment");
        if (req.body.password != req.body.confirmPassword || req.body.password != UserFind.password) {
            console.log("Inside the if statment");
            return res.redirect('back');

        }
        else {

            console.log("Inside the Authentication statment");
            User.findByIdAndUpdate(req.params.id, { $set: { name: req.body.Chaname } }, function (err, UpdateProfile) {
                if (err) {
                    console.log("Error during update the user name")
                    return res.redirect('back');
                }
                return res.redirect('back');
            })
        }

    })




}

module.exports.updateForm = function (req, res) {

    res.render('UpdateForm', {
        title: 'Update'
    });
}

