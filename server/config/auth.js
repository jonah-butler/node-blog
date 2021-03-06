const jwt = require('jsonwebtoken');

module.exports = {
  async isLoggedIn(req, res, next) {
    try{
      const token = req.body.user.tokens[0].token;
      const decoded = jwt.verify(token, 'secret');
      req.body.userData = decoded;
      if(decoded){
        next();
      } else {
        res.status(400).json({err: 'please provide toekn'});
      }
    } catch(err) {
      res.status(400).json({err: 'please provide token'});
    }
  }
}