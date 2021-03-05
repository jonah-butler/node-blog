const User = require('../models/user.js');

module.exports = {
  async registerNewUser(req, res) {
    try {
      console.log(req.body);
      // console.log(isUser);
      //  if (isUser.length >= 1) {
      //    return res.status(409).json({
      //      message: "email already in use"
      //    });
      //  }
       const user = new User({
         username: req.body.username,
         email: req.body.email,
         password: req.body.password
       });
       let data = await user.save();
       const token = await user.generateAuthToken();
       res.status(201).json({ data, token });
     } catch (err) {
       res.status(400).json({ err: err });
     }
  },
  async login(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findByCredentials(email, password);
      if (!user) {
        return res.status(401).json({ error: "Login failed! Check authentication credentials" });
      }
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  },
  async getUser() {

  },
};
