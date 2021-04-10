const express = require('express');
const userCookie = require('cookie-parser')
const path  = require('path')
const port = 8000
const app = express();
const expressLayouts = require('express-ejs-layouts')
const sassMiddleware = require('node-sass-middleware')
const passportHttp = require('passport-http');
// for using the logout funtion in authentication
const logout = require('express-passport-logout')
const flash = require('connect-flash');
const customMware = require('./config/middleware')

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle : 'extended',
    prefix: '/css'
}))



// for database
const db = require('./config/mongoose');
const session = require('express-session')

app.use(expressLayouts)
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

const passport = require('passport')
const passportLocal = require('./config/passport-local-strtegy')
const MongoStore = require('connect-mongo')(session);

const passportJWT = require('./config/passport-jwt-strategy')

app.use(express.static('./assets'))


// setUp for encoded the post data
app.use(express.urlencoded());

// setUp cookies note: always defied cookie parsor before the routes
app.use(userCookie());



// veiw engine
app.set('view engine','ejs');

// view file
app.set('views',path.join(__dirname,'./views'))


app.use(session({
    name: 'codeail',
    secret: 'blahsomething',
    saveUninitialized : false,
    resave: false,
    cookie: {
        maxAge : (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err)
    {
        console.log(err)
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.SetAuthenticationUser);
// Always define flash after the seesion cookies because only work after the session cookkies is made
app.use(flash());
app.use(customMware.setFlash)

app.use('/uploads',express.static(__dirname + '/uploads'))

// Setup Route
app.use('/',require('./routes/'))



// SetUp live server
app.listen(port,function(err)
{
    if(err)
    {
        console.log('Error while SetUp Live Server')
        return;
    }
    console.log('Live Server Start successfully at port:',port)
})