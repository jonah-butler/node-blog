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
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login details" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login details" });
  }
  return user;
};

module.exports = mongoose.model("User", UserSchema);
