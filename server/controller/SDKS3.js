const FroalaEditor       = require('wysiwyg-editor-node-sdk');
const AmazonS3URI        = require('amazon-s3-uri');
const AWS                = require('aws-sdk');
const Blog               = require('../models/blog.js');

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
  async delete2(req, res) {
    console.log('handler', req, res);
  },
  async delete(req, res) {

    const blogId = req.body.blogId;
    const imageURI = req.body.uri;

    const DEFAULT_IMAGE = process.env.DEFAULT_BG;

    if(DEFAULT_IMAGE === imageURI) {
      res.status(400).send({
        statusCode: 400,
        message: "Default image background can not be deleted"
      })
    };

    try{
      const { bucket, key } = AmazonS3URI(imageURI);

      s3.deleteObject({
        Bucket: bucket,
        Key: key,
        
      }, async (err, data) => {
        if(err) {
          console.log('IMAGE DELETE ERROR: ', err);
        } else {

          const blog = await Blog.findById(blogId);
          console.log(blog);
          
          blog.featuredImageLocation = DEFAULT_IMAGE;
          blog.featuredImageTag = "";
          blog.featuredImageKey = "";

          await blog.save();

          res.status(200).json(
            {
              statusCode: 200,
              blog: blog
            }
          );
        }
      })
    } catch(err) {
      res.status(400).json({
        statusCode: 400,
        message: "Invalid uri parameters"
      })
    }
  }
}
