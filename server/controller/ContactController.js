const sgMail = require('@sendgrid/mail');

require('dotenv').config();

module.exports = {
  async emailSend(req, res) {
    try{
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: 'jonahbutler6@gmail.com',
        from: 'jonahbutler6@gmail.com',
        subject: `Dev Blog Contact from ${req.body.name}`,
        text: req.body.message + `\n\n\n\n\n Email sent from: ${req.body.email}`,
      };

      sgMail
        .send(msg)
        .then((result) => {
          res.send({status: 200});
        })
        .catch((err) => {
          res.send({status: err});
        })
    } catch(error) {
      res.send({status: error});
    }
  }
}