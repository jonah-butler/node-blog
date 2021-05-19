const express         = require('express'),
      router          = express.Router(),
      UserController  = require('../controller/UserController.js'),
      multer   = require('multer'),
      multerS3 = require('multer-s3'),
      AWS      = require('aws-sdk'),
      dotenv   = require('dotenv');

dotenv.config();

// AWS.config.update({
//   secretAccessKey: process.env.AWS_S3_SECRET,
//   accessKeyId: process.env.AWS_S3_ID,
//   region: 'us-east-1'
// });
//
// const s3 = new AWS.S3();

// const uploadUserImg = multer({
//   storage: multerS3({
//       s3: s3,
//       acl: 'public-read',
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       fileFilter: (req, file, cb) => {
//         console.log(req);
//       }
//       bucket: 'dev-blog-resources',
//       key: function (req, file, cb) {
//           cb(null, file.originalname); //use Date.now() for unique file keys
//       }
//     })
//   }).single('image');

// router.post('/register', uploadUserImg, UserController.registerNewUser);
router.post('/register', UserController.registerNewUser);
router.post('/login', UserController.login);
router.get('/user', UserController.getUser);

module.exports = router;
