// const AWS = require('aws-sdk');
// const fs = require('file-system');
const Blog = require('../models/blog.js');

const isNotDraft = async (req, res, next) => {
  let post = await Blog.findOne({slug: req.body.slug});
  if (!post.published) {
    res.status(500).send({error: 'post is draft'});
  } else {
    next();
  }
}

const splitStr = (str) => {
  return str.split(" ");
}

const displayImg = async() => {
  const ID = 'AKIAJCW6NV7DHVKZJGKA';
  const SECRET = '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';

  // The name of the bucket that you have created
  const BUCKET_NAME = 'dev-blog-resources';

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
  });

  const params = {
   Bucket: BUCKET_NAME,
   Body: fs.createReadStream('../code-nav.svg'),
   Key: "testImg2",
  };

  s3.upload(params, (err, data) => {
    if(err){
      throw err;
    } else {
      console.log(data);
    }
  })
}

const selectRandomBlog = (blogArr) => {
  return blogArr[Math.floor(blogArr.length * Math.random())];
}


const test = () => {
  console.log('yo');
}
// document.querySelector('.button-main1').addEventListener('click', (e) => {
//    displayImg();
//   console.log('waited');
// })

//
exports.splitStr = splitStr;
exports.selectRandomBlog = selectRandomBlog;
exports.isNotDraft = isNotDraft;
