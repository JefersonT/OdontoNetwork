const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { /*host, port,*/ user, pass } = require('../config/mail.json')
const transport = nodemailer.createTransport({
    // host,
    // port,
    service: 'gmail',
    auth: { user, pass }
  });

    // "user": "2f01b42c81afce",
    // "pass": "962eebdc34c941"

  transport.use('compile', hbs({
      viewEngine: 'handlebars',
      viewPath: path.resolve('./src/resources/mail/'),
      extName: '.html',
  }));

  module.exports = transport;