const FroalaEditor       = require('wysiwyg-editor-node-sdk');
const AmazonS3URI        = require('amazon-s3-uri');
const AWS                = require('aws-sdk')

require('dotenv').config();

AWS.config.update({
  secretAccessKey: process.env.AWS_S3_SECRET,
  accessKeyId: process.env.AWS_S3_ID,
  region: 'us-east-1',
});

const s3 = new AWS.S3();

module.exports = {
  async getHash(req, res) {

    const configs = {
      bucket: 'dev-blog-resources',
      keyStart: 'uploads/',
      acl: 'public-read',
      region: 'us-east-1',
      accessKey: process.env.AWS_S3_ID,
      secretKey: process.env.AWS_S3_SECRET
    }

    const s3Hash = FroalaEditor.S3.getHash(configs);

    res.send(s3Hash);

  },
  async delete(req, res) {
    const uri = req.body.s3src;

    try{
      const {region, bucket, key} = AmazonS3URI(uri);

      s3.deleteObject({
        Bucket: bucket,
        Key: key,
      }, (err, data) => {
        if(err) {
          console.log(err);
        } else {
          res.status(200).send({statusCode: 200});
        }
      })
    } catch(err) {
      console.warn(err);
    }
  }
}
