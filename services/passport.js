const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    console.log('serializeee',user)
  done(null, user.id);
})
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    console.log('deserializeeeeeeee',user)
    done(null, user);
  })
});
passport.use(new GoogleStrategy({
    clientID: Keys.GOOGLE_CLIENT_ID,
    clientSecret: Keys.GOOGLE_CLIENT_SECRETKEY,
    callbackURL: "/auth/google/callback",
    proxy: true
  },(accessToken, refreshToken, profile, done) => {
        User.findOne({googleID: profile.id}).then((existingUser) => {
            if(existingUser){
                done(null, existingUser);
            } else{
                new User({googleID: profile.id}).save()
                .then((user) => {
                    console.log(user);
                    done(null, user);
                })
            }
        })
   }
))

