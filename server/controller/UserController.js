const User     = require('../models/user.js'),
      multer   = require('multer'),
      multerS3 = require('multer-s3'),
      AWS      = require('aws-sdk'),
      dotenv   = require('dotenv');

dotenv.config();

AWS.config.update({
  secretAccessKey: process.env.AWS_S3_SECRET,
  accessKeyId: process.env.AWS_S3_ID,
  region: 'us-east-1'
});

const s3 = new AWS.S3();

const uploaderUserImg2 = async function(req, res) {
  const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        bucket: 'dev-blog-resources',
        key: function (req, file, cb) {
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
      })
    }).single('image');
    // return true;
    return upload;
}

const uploadUserImg = multer({
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      bucket: 'dev-blog-resources',
      key: function (req, file, cb) {
          cb(null, file.originalname); //use Date.now() for unique file keys
      }
    })
  }).single('image');

module.exports = {
  async registerNewUser(req, res) {
    try { 
      console.log(req.file);
      console.log(req.body);
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profileImageLocation: req.file.location,
        profileImageTag: req.file.etag,
        profileImageKey: req.file.key,
      });
      let data = await user.save();
      const token = await user.generateAuthToken();
      console.log(user);
      res.status(201).json({ data, token });
     } catch (err) {
       res.status(400).json({ err: err });
     }
  },
  async login(req, res) {
    try {
      const user = await User.findByCredentials(req.body.username, req.body.password);
      if (!user) {
        return res.status(401).json({ error: "Login failed! Check authentication credentials" });
      }
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  },
  async getUser() {

  },
};
