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


dotenv.config();

AWS.config.update({
    secretAccessKey: process.env.AWS_S3_SECRET,
    accessKeyId: process.env.AWS_S3_ID,
    region: 'us-east-1'
});

const s3 = new AWS.S3();

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

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({createdAt: -1});
    res.send(blogs);
  } catch (err) {
    console.log(err);
  }
})

router.get("/random", async (req, res) => {
  const blogs = await Blog.find({});
  res.send(helpers.selectRandomBlog(blogs));
})

router.get("/new", (req, res) => {
  res.render("blog/new");
})

router.post('/blog/', async (req, res) => {
  let post = await Blog.findOne({slug: req.body.slug});
  const previousPost = await Blog.findOne({_id: {"$lt": post._id}}).sort({_id: -1}).limit(1);
  const nextPost = await Blog.findOne({_id: {"$gt": post._id}}).sort({_id: 1}).limit(1);
  res.send({
    post1: post,
    previousPost: previousPost,
    nextPost: nextPost,
  });
  post = await Blog.findOneAndUpdate(
    {slug: req.body.slug},
    {views: post.views + 1}
    )
})

router.post('/search', async (req, res) => {
  const pattern = `\\b${req.body.query}\\b`;
  const post = await Blog.find(
  {$or: [
     { text: { $regex: pattern, $options: 'i' } },
     { title: { $regex: pattern, $options: 'i' } },
     { categories: {  $regex: pattern, $options: 'i'} }
    ]}
  );
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
    console.log(req.body);
    for(const prop in req.body){
      if(prop === 'categories'){
        blog.categories = [];
        JSON.parse(req.body.categories).forEach(category => blog.categories.push(category));
      } else {
        blog[prop] = req.body[prop];
      }
    }
    await blog.save();
    res.send({updatedBlog: blog});
  } catch(err) {
    res.send({error: err});
  }

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
