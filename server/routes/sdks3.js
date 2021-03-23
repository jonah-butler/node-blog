const SDKController   = require('../controller/SDKS3.js'),
      express         = require('express'),
      router          = express.Router()

router.get('/get-signature', SDKController.getHash);

module.exports = router;
