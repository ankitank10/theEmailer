const _ = require('lodash');
const Path = require('path-parser');
//const URL = require('url').Url;
//const { URL } = require('url');
const URL = require('url');
const requireLogin = require("../middlewares/requirelogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model("surveys");



module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => {
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      mailer.send((response) => {
        survey.save();
        req.user.credits -= 1;
        req.user.save()
          .then(user => {
            res.send(user);
          })
      });
    } catch (error) {
      res.status(422).send(err);
    }

  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    console.log(req.body);
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(URL.parse(url, true).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.get('/api/surveys', requireLogin, (req, res) => {
    Survey.find({ _user: req.user.id }).select({ recipients: false })
      .then((surveys) => {
        res.send(surveys);
      })

  })
};
