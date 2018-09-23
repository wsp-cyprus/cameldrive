"use strict";

var Mailgun = require('mailgun-js');

module.exports = {
  test: function(options, cb) {
    // console.log('EmailService:');
    // console.log(options);
    return cb({emailOptions: options});
  },
  sendEmail: function (subject, html) {
    var api_key = process.env.MAILGUN_API_KEY || 'none';
    var domain = process.env.MAILGUN_DOMAIN || 'none';

    var data = {
      // from: 'dponfl@gmail.com',
      // to: 'dshchfl@gmail.com',
      from: 'info@cameldrive.com',
      to: 'info@cameldrive.com',
      subject: subject,
      html: html,
    };

    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    mailgun.messages().send(data, function (err, body) {
      // console.log('EmailService, sendEmail');

      if (err) {
        // console.log('Error:');
        // console.dir(err);
        return;
      }

      // console.log('Mail was successfully sent!');
      // console.dir(body);
    });

  }
};