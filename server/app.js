const express               = require('express'),
      app                   = express(),
      session               = require('express-session'),
      expressSanitizer      = require('express-sanitizer'),
      cors                  = require('cors'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      methodOverride        = require('method-override'),
      morgan                = require('morgan'),
      blogRoutes            = require("./routes/blog.js"),
      userRoutes            = require('./routes/user.js'),
      sdkRoutes             = require('./routes/sdks3.js'),
      contactRoutes         = require('./routes/contact.js'),
      BlogModel             = require("./models/blog.js"),
      UserModel             = require('./models/user.js'),
      config                = require('./config/db.js'),
      dotenv                = require('dotenv')

dotenv.config();

try{
  mongoose.connect(process.env.DB_URL,
  	{
  		useNewUrlParser: true,
  		useUnifiedTopology: true,
  		useFindAndModify: false,
      useCreateIndex: true,
  	});
} catch (error) {
  console.log(error);
}


app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

const whitelist = ['https://www.jonahbutler.dev', 'http://localhost:8080'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}


app.set("view engine", "ejs");
// {origin: 'https://goofy-jang-76ea1a.netlify.app'}
// app.use(cors());
app.use(morgan("dev"));
// app.options('*', cors({origin: 'https://www.jonahbutler.dev'}));
app.use(express.static(__dirname + "/scripts"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
  type: ['application/json', 'text/plain'],
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


app.use("/", cors(corsOptions), blogRoutes);
app.use("/", cors(corsOptions), userRoutes);
app.use("/", cors(corsOptions), sdkRoutes);
app.use("/", cors(corsOptions), contactRoutes);

// Seed();

const port = process.env.PORT || 4000;
app.listen(port, (req, res) => {
  console.log('listening on port 4000');
});
