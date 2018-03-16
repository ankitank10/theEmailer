const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.SENDGRID_API_KEY);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    this.addContent(this.body); // addcontent is mail default function
    this.addClickTracking();
    this.addRecipients();
  }
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  send(callback) {
    // console.log('senddd');
    // const request = this.sgApi.emptyRequest({
    //   method: 'POST',
    //   path: '/v3/mail/send',
    //   body: this.toJSON()
    // });
    // this.sgApi.API(request)
    // console.log('sgapi', request)
    //   .then((response) => {
    //     console.log(response);
    //     return response;
    //   })

      const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
      });

      this.sgApi.API(request, (response) => {
        try {
          callback(response);
        } catch (error) {
          console.log('errorrr', error.response.body);
        }

      });


  }

}

module.exports = Mailer;