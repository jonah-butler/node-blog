const  mongoose = require('mongoose'),
       bcrypt   = require('bcrypt'),
       jwt      = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please include your name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please include your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please include your password'],
  },
  profileImageLocation:{
    type: String,
  },
  profileImageTag:{
    type: String,
  },
  profileImageKey:{
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
}, {timestamps: true}
)

UserSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  // console.log('pword', user.password);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const ONE_WEEK = 60 * 60 * 24 * 7;

  const token = jwt.sign({ _id: user._id, username: user.username, email: user.email },
  "secret",{
    expiresIn: ONE_WEEK
  });
  if(user.tokens.length == 0){
    user.tokens = user.tokens.concat({ token });
  } else {
    console.log('user', user);
    console.log('tokens', user.tokens);
    await user.tokens.pop();
    user.tokens = user.tokens.concat({ token });
  }
  // user.tokens = user.tokens.concat({ token });
  // user.token = jwttoken;
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    return {error: 'no user found'};
    // throw new Error({ error: "Invalid login details" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return {error: 'wrong password'};
    // throw new Error({ error: "Invalid login details" });
  }
  return user;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
