const jwt = require('jsonwebtoken');

module.exports = {
  async validateTokenHeader(req, res, next) {
    const token = req.headers.token;
    if(!token) {

      res.status(400).json({
        statusCode: 400,
        message: "No token present in header"
      })

    } else {

      const decodedToken = jwt.verify(token, 'secret');
      
      if(decodedToken._id && decodedToken.username) {

        req.body.user = decodedToken;
        next();

      } else {

        res.status(400).json({
          statusCode: 400,
          message: 'Invalid token - token could not be verified'
        });

      }

    }
  },
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
  },
}