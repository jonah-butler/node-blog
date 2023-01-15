const jwt = require('jsonwebtoken');

module.exports = {
  async isLoggedIn(req, res, next) {
    let token;
    const authHeader = req.headers.authorization.split('Bearer ')[1];
    if (req.body.user) {
      token = req.body.user.tokens[0].token;
    } else if (authHeader.length) {
      token = authHeader;
    } else {
      res.status(400).json({err: 'please provide token'});
    }
    console.log("token", token);
    try{
      const decoded = jwt.verify(token, 'secret');
      req.body.userData = decoded;
      if(decoded){
        next();
      } else {
        res.status(400).json({err: 'please provide token'});
      }
    } catch(err) {
      res.status(400).json({err: 'please provide token'});
    }
  },
}