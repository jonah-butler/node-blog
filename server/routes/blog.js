const express         = require('express'),
      app             = express(),
      router          = express.Router(),
      helpers         = require('../scripts/helpers.js'),
      dotenv          = require('dotenv'),
      multer          = require('multer'),
      multerS3        = require('multer-s3'),
      AWS             = require('aws-sdk'),
      Blog            = require('../models/blog.js'),
      // passport        = require('passport'),
      User            = require('../models/user.js'),
      auth            = require('../config/auth.js')

// process.on('unhandledRejection', (reason, promise) => {
//   console.log('Unhandled Rejection at:', reason.stack || reason)
// })

//Make env variables available
dotenv.config();
// const upload = multer({
//   dest: "./uploads/"
// })
AWS.config.update({
    secretAccessKey: process.env.AWS_S3_SECRET,
    accessKeyId: process.env.AWS_S3_ID,
    region: 'us-east-1'
});
const s3 = new AWS.S3();


// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_S3_ID,
//   secretAccessKey: process.env.AWS_S3_SECRET
// })

// const uploadS3 = multer({
//   storage: multerS3({
//     s3: s3,
//     ACL: 'pulic-read',
//     bucket: 'dev-blog-resources',
//     metadata: (req, file, cb) => {
//      cb(null, {fieldName: file.fieldname})
//     },
//     key: (req, file, cb) => {
//      cb(null, Date.now().toString() + '-' + file.originalname)
//     }
//   })
// })

const upload = multer({}).single('image');

const uploadImg = multer({
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

const upload2 = async(req, res) => {
 let result = await multer({
     storage: multerS3({
         acl: 'public-read',
         s3: s3,
         bucket: 'dev-blog-resources',
         key: function (req, file, cb) {
             cb(null, file.originalname); //use Date.now() for unique file keys
         }
     })
 })
 return result;
};



 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/", (req, res) => {
  // res.render("blog/landing");
  Blog.find({}, (err, blogs) => {
    res.send(blogs);
  });
})

router.get("/random", async (req, res) => {
  // res.render("blog/landing");
  const blogs = await Blog.find({});
  res.send(helpers.selectRandomBlog(blogs));
})

router.get("/new", (req, res) => {
  res.render("blog/new");
})

router.post('/blog/', async (req, res) => {
  let post = await Blog.findOne({slug: req.body.slug});
  post = await Blog.findOneAndUpdate(
    {slug: req.body.slug},
    {views: post.views + 1}
    )
  res.send(post);
})
//blogshow route - updating rating
router.post('/blog/like', async (req, res) => {
  if(req.body.liked){
    let post = await Blog.findOneAndUpdate(
      {slug: req.body.slug},
      {rating: req.body.rating + 1}
    );
  } else {
    let post = await Blog.findOneAndUpdate(
      {slug: req.body.slug},
      {rating: req.body.rating - 1}
    );
  }
  post = await Blog.findOne({slug: req.body.slug});
  res.send(post);
})

router.post('/blog/edit', auth.isLoggedIn, async (req, res) => {
  const post = await Blog.findOne({_id: req.body._id});
  // console.log(post);
  res.send(post);
})

// router.post('/register', async(req, res) => {
//   console.log(req.body.auth);
//   const newUser = new User(req.body.auth);
//   User.register(newUser, req.body.auth.password, (err, user) => {
//     if(err){
//       console.log(err);
//     } else {
//       res.send({});
//     }
//   })
// })

router.put('/blog/edit', uploadImg, async (req, res) => {
  try{
    const blog = await Blog.findOne({_id: req.body.id});
    if(res.req.file){
      // const blog = await Blog.findOne({_id: req.body.id});
      s3.deleteObject({
        Bucket: 'dev-blog-resources',
        Key: blog.featuredImageKey,
      }, (err, data) => {
        if(err){
          console.log(err);
        } else {
          console.log(data);
        }
      })
      blog.featuredImageKey = res.req.file.key;
      blog.featuredImageTag = res.req.file.etag;
      blog.featuredImageLocation = res.req.file.location;
    }
    for(const prop in req.body){
      console.log(req.body);
      blog[prop] = req.body[prop];
    }
    await blog.save();
    res.send({updatedBlog: blog});
  } catch(err) {
    res.send({error: err});
  }
  // if(res.req.file){
  //   // const blog = await Blog.findOne({_id: req.body.id});
  //   s3.deleteObject({
  //     Bucket: 'dev-blog-resources',
  //     Key: blog.featuredImageKey,
  //   }, (err, data) => {
  //     if(err){
  //       console.log(err);
  //     } else {
  //       console.log(data);
  //     }
  //   })
  //   blog.featuredImageKey = res.req.file.key;
  //   blog.featuredImageTag = res.req.file.etag;
  //   blog.featuredImageLocation = res.req.file.location;
  // } else {
    // for(const prop in req.body){
    //   blog[prop] = req.body[prop];
    // }
  // }
  // await blog.save();
  // for(const prop in req.body){
  //   blog[prop] = req.body[prop];
  // }
  // if(res.req.file){

  // check for existence of res.req.file inside img Upload method
  // if undefined, move to check req.body formData text fields and update accordingly
  // if res.req.file update blog details along with text fields and save
  // after update, delete original image from s3 server
    // uploadImg(req, res, (err) => {
    //   if(err){
    //     console.log('s3 error', err);
    //   } else {
    //     // console.log(res.req.file);
    //     if(res.req.file){
          // s3.deleteObject({
          //   bucket: 'dev-blog-resources',
          //   key: blog.featuredImageKey,
          // }, (err, data) => {
          //   if(err){
          //     console.log(err);
          //   } else {
          //     console.log(data);
          //   }
          // })
    //     }
    //     console.log('req.body', req.body);
    //   }
    // })
  // }
  // await blog.save();
  // res.send({updatedBlog: 'success'});
  // console.log('body', req.body);
  // console.log('files', res.req.file);
  // upload2Async(req, res, (err) => {
  //   if(err){
  //     console.log(err);
  //   } else {
  //     const blog = await Blog.findOne({_id: req.body.id});
  //     console.log(blog);
  //     console.log('form body', req.body);
  //     console.log('form files', res.req.file);
  //     res.send({result: 'received'});
  //   }
  // })
})

router.delete('/blog/delete/:slug', async (req, res) => {
  console.log(req.params.slug);
  const result = await Blog.deleteOne({slug: req.params.slug});
  res.send(result);
  // res.send({'test': 'test'});
})

router.post("/", async (req, res) => {
  try{
    uploadImg(req, res, (err) => {
      if(err){
        console.log(err);
      } else {
        let newBlog = {
          title: req.body.title,
          featuredImageLocation: res.req.file.location,
          featuredImageTag: res.req.file.etag,
          featuredImageKey: res.req.file.key,
          text: req.body.froala,
          categories: [],
        }
        JSON.parse(req.body.categories).forEach(category => newBlog.categories.push(category));
        Blog.create(newBlog, (err, blog) => {
          if(err){
            console.log(err);
          } else {
            console.log(blog);
            res.send(blog);
          }
        })
      }
    })
  }
  catch (error){
    console.log(error);
  }
})

module.exports = router;
