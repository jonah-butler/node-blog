const express               = require('express'),
      app                   = express(),
      session               = require('express-session'),
      expressSanitizer      = require('express-sanitizer'),
      cors                  = require('cors'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      methodOverride        = require('method-override'),
      // passport              = require('passport'),
      // passportLocalMongoose = require('passport-local-mongoose'),
      // LocalStrategy         = require('passport-local'),
      blogRoutes            = require("./routes/blog.js"),
      BlogModel             = require("./models/blog.js"),
      UserModel             = require('./models/user.js')



try{
  mongoose.connect('mongodb://localhost:27017/dev-blog',
  	{
  		useNewUrlParser: true,
  		useUnifiedTopology: true,
  		useFindAndModify: false,
      useCreateIndex: true,
  	});
} catch (error) {
  console.log(error);
}
// The name of the bucket that you have created
// const BUCKET_NAME = 'dev-blog-resources';
//
// const s3 = new AWS.S3({
//   accessKeyId: ID,
//   secretAccessKey: SECRET
// });

// const params = {
//  Bucket: BUCKET_NAME,
//  ACL: 'public-read',
//  ContentType: 'image/jpeg',
//  Body: fs.createReadStream('./paint_store2.jpeg'),
//  Key: "paint_store_new.jpeg",
// };
//
// const params = {
//  Bucket: BUCKET_NAME,
//  ACL: 'public-read',
//  ContentType: 'image/jpeg',
//  Body: fs.createReadStream('./paint_store2.jpeg'),
//  Key: "paint_store_new.jpeg",
// };

// s3.upload(params, (err, data) => {
//   if(err){
//     throw err;
//   } else {
//     console.log(data);
//   }
// })

// s3.getObject(params, (err, data) => {
//   if(err){
//     throw err;
//   } else {
//     console.log(data);
//     // console.log(data.Body.toString());
//   }
// })

//DEPENDENCIES connect
// app.options('*', (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.send('ok');
// });
//
// app.use((req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
// });

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});
// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.set("view engine", "ejs");
app.use(cors());
// app.use(cors({
//   origin:['http://localhost:8080'],
//   methods:['GET','POST'],
//   credentials: true // enable set cookie
// }));
app.options('*', cors());
app.use(express.static(__dirname + "/scripts"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
  type: ['application/json', 'text/plain'],
}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// PASSPORT CONFIG
// app.use(session({
//   secret: 'much secret yet',
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(UserModel.authenticate()));
// passport.use(UserModel.createStrategy());
// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());


app.use("/", blogRoutes);

// Seed();

const port = process.env.PORT || 4000;
app.listen(port, (req, res) => {
  console.log('listening on port 4000');
});
