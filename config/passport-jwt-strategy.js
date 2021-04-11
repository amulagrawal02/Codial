const User = require('./../models/userSchema')
const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;



let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(opts,function(jwtPlayLoad,done)
{
    User.findById(jwtPlayLoad._id,function(err, user)
    {
        if(err){console.log('error in finding the user from jwt'); return;}
        if(user)
        {
            return done(null, user);
        }
        else{
            return done(null, false)
        }
    })
}))

module.exports =  passport