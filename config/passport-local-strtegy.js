// Require the passport library
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userSchema')


// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    // this email is same as mongoose schema 
    passReqToCallback : true
    //  this function passReqToCallback is use because we want to access req.flash() 
    // and req is not define that's why we use to able to access the req 
    },
    function(req,email,password,done)
    {
        // Find the user using email
        User.findOne({email : email},function(err,user)
        {
            if(err)
            {
                console.log('Error in Finding User ---> passport')
                return done(err)
            }
            if(!user || user.password != password)
            {
                req.flash('error' , 'Invalid User/Password')
                console.log("Invalid User/Password")
                return done(null, false)
            }
            return done(null,user)
        })
    }

))

// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
})

// deserializing the user from the key in the cookies

passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log('Error in Finding User ---> passport')
            return done(err)
        }

        return done(null,user)
    })
})


// // Check whether is user is sign-in or not
passport.checkAuthentication = function(req,res,next)
{
    if(req.isAuthenticated())
    {
            return next();
    }
    return res.redirect('/user/sign-in')

//     return res.redirect('/user/sign-in')
}

passport.SetAuthenticationUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
       // req.user contains the current signed-in user from the session cookie and we are just sending this to the locals for the views

         res.locals.user = req.user;
    }
    next();
}


module.exports = passport;