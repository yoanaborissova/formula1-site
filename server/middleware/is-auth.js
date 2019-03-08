const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeaders = req.get('Authorization');
  if (!authHeaders) {
    return res.status(401)
      .json({ message: 'Not authenticated.' })
  }

  const token = req.get('Authorization').split(' ')[1];
  console.log(authHeaders);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecret')
  } catch(error) {
    return res.status(401)
      .json({ message: 'Token is invalid.', error });
  }

  if (!decodedToken) {
    return res.status(401)
      .json({ message: 'Not authenticated.' });
  }

  req.token = decodedToken;
  next();
};