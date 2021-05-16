const sgMail = require('@sendgrid/mail');

require('dotenv').config();

module.exports = {
  async emailSend(req, res) {
    try{
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: 'jonahbutler6@gmail.com',
        from: 'jonahbutler6@gmail.com',
        subject: `New Email Through Dev Blog from ${req.body.name}`,
        text: req.body.message + `Email sent from: ${req.body.email}`,
      };

      sgMail
        .send(msg)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        })
    } catch(error) {
      console.log(error);
    }
  }
}