const keys = require('../config/keys');
const requireLoginMiddleware = require('../middlewares/requirelogin');
const stripe = require("stripe")(
    keys.STRIPE_SEC_KEY
  );

module.exports = (app) => {
    app.post('/api/stripe', requireLoginMiddleware, (req, res) => {
        stripe.charges.create({
            amount: 500,
            currency: "usd",
            source: req.body.id, // obtained with Stripe.js
            description: "Charges for surveyly credits"
          })
          .then(charge => {
              req.user.credits += 5;
              req.user.save()
              .then(user => {
                  res.send(user);
              })
          })
    })

}