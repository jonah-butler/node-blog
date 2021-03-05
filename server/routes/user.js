const express         = require('express'),
      router          = express.Router(),
      UserController  = require('../controller/UserController.js')

router.post('/register', UserController.registerNewUser);
router.post('/login', UserController.login);
router.get('/user', UserController.getUser);

module.exports = router;
