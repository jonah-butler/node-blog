const SDKController   = require('../controller/SDKS3.js'),
      express         = require('express'),
      router          = express.Router()

router.get('/get-signature', SDKController.getHash);
router.post('/s3/delete', SDKController.delete);

module.exports = router;
