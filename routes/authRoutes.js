
const passport = require('passport');
module.exports = (app) => {
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile'] })
    );
    app.get('/auth/google/callback', 
        passport.authenticate('google'),
        //After the passport has autheticated the callback having the token it is redirected to surveys
        (req, res) => {
            res.redirect('/surveys');
        }
    );
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        req.session = null;
        res.redirect('/');
    });
}