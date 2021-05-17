const express           = require('express'),
      router            = express.Router(),
      ContactController = require('../controller/ContactController.js')

router.post('/email', ContactController.emailSend);

module.exports = router;

