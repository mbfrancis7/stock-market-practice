const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: function(req,res,next) {
    let bearerHeader = req.headers['authorization'];
    if(bearerHeader) {
      const bearer = bearerHeader.split(' ')
      const token = bearer[1];
      jwt.verify(token, 'secretKey', (err, data) => {
        if(err) {res.json({message: err})}
        console.log(data)
        res.send(data)
      })
    } else {
      res.send({message: 'Not Authorized'})
    }
  }
}