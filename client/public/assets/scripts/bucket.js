const AWS = require('aws-sdk');

const ID = 'AKIAJCW6NV7DHVKZJGKA';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'dev-blog-resources';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
})
