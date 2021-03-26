const User = require('../models/userSchema');
const { patch } = require('../routes');

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


// function to create the new user
module.exports.create = function (req, res) {

    if (req.body.password != req.body.confirmpassword) {
        req.flash('success' , 'Password Not match')
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
                req.flash('success' , 'User Create Successfully')
                return res.redirect('sign-in');

            })
        }
        else {
            
            req.flash('success' , 'Email is already registor')
            return res.redirect('back')
        }

    })

}

// Function to create session
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully')
    return res.redirect('/')
}

// funtion for user sign-out
module.exports.signOut = function (req, res) {

   
    req.logout();
    req.flash('success', 'Logged Out Successfully')
    return res.redirect('/user/sign-in');

}

// Function to update the profile name of the user
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

// funtion when user click on the update option i.e. update form
module.exports.updateForm = function (req, res) {

    res.render('UpdateForm', {
        title: 'Update'
    });
}

