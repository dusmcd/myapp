const express = require('express'),
    app     = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose    = require('mongoose'),
    passport = require('passport'),
    cloudinary = require('cloudinary'),
    LocalStrategy = require('passport-local');
    
//require routes
const routes = require('./routes/index');
    
//APP CONFIG

// configure cloudinary for uploading images to cloud storage
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.KEY,
    api_secret: process.env.SECRET
});

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(require('express-session')({
    secret: 'I read the news today, oh boy.',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// connect to db

// const promise = mongoose.connect(process.env.DATABASEURL, {
//     useMongoClient: true
// });
// promise.then();

// passport config

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//current user available for all routes
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


// use routes
app.use(routes);

//set up server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('The server is listening');
});