const SDKController   = require('../controller/SDKS3.js'),
      express         = require('express'),
      router          = express.Router(),
      auth            = require('../config/auth.js');

router.get('/get-signature', SDKController.getHash);
router.post('/s3/delete', auth.validateTokenHeader, SDKController.delete);

module.exports = router;
