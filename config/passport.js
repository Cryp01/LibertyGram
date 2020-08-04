const localStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');

module.exports = function (passport){
    passport.serializeUser(function (user, done) {
        done(null,user.id);
    });
    passport.deserializeUser(function (id, done){
        User.findById(id, function(err,user){
            done(err,user);
        });
    });

    //sign up

    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        User.findById({'local.email': email}, function (err, user){
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null,false,req.flash('signupMessage', 'The email is already taken.'));
            }
            else {
                var newUser =  new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function (err){
                    if (err){throw err;}
                    return done(null, newUser);
                });
            }
        });
    }));

    //google

    passport.use(new GoogleStrategy({
        clientID: "111940832776-5q4n2sr592qqnbt7tc9t9pfju45s6dih.apps.googleusercontent.com",
        clientSecret: "W-6HcYEgGQ-tMYo_ZHrukgCq",
        callbackURL: "http://localhost:3000/profile"
      },

      function(accessToken, refreshToken, profile, done) {
           User.findOrCreate({ googleId: profile.id }, function (err, user) {
             return done(err, user);
           });
      }

    ));

  //Login
    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        User.findById({'local.email': email}, function (err, user){
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null,false,req.flash('loginMessage', 'No user found.'));
            }
            if (!user.validatePassword(password)){
                return done(null, false, req.flash('loginMessage','Wrong password'));
            }
            return done(null, user);
        });
    }));
}