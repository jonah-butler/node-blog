const User = require('../models/user.js');

module.exports = {
  async registerNewUser(req, res) {
    try { 
       const user = new User({
         username: req.body.username,
         email: req.body.email,
         password: req.body.password
       });
       console.log('new user', user);
       let data = await user.save();
       const token = await user.generateAuthToken();
       console.log(token);
       console.log(user);
       res.status(201).json({ data, token });
     } catch (err) {
       res.status(400).json({ err: err });
     }
  },
  async login(req, res) {
    try {
      const user = await User.findByCredentials(req.body.username, req.body.password);
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
