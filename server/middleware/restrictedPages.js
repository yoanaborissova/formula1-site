const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
  isAuthed: (req, res, next) => {
    const authHeaders = req.get('Authorization');

    if (!authHeaders) {
      return res.status(401)
        .json({ message: 'This action is allowed only for logged in users.' });
    }

    const token = req.get('Authorization').split(' ')[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, 'somesupersecret')
    } catch (error) {
      return res.status(401)
        .json({ message: 'Token is invalid.', error });
    }

    next();
  },
  isAnonymous: (req, res, next) => {
    const authHeaders = req.get('Authorization');

    const token = authHeaders.split(' ')[1];

    if (token) {
      return res.status(401)
        .json({ message: 'You are already logged in.' });
    }

    next();
  },
  isAdmin: (req, res, next) => {
    const authHeaders = req.get('Authorization');

    if (!authHeaders) {
      return res.status(401)
        .json({ message: 'This action is allowed only for logged in users.' });
    }

    const token = req.get('Authorization').split(' ')[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, 'somesupersecret')
    } catch (error) {
      return res.status(401)
        .json({ message: 'Token is invalid.', error });
    }

    let userId = decodedToken.userId;

    User.findById(userId)
      .then(user => {
        if (user.roles.indexOf('Admin') === -1) {
          return res.status(401)
            .json({ message: 'This action is allowed only for admins.' });
        }

        next();
      })
  },
  isOwner: (req, res, next) => {
    const authHeaders = req.get('Authorization');

    if (!authHeaders) {
      return res.status(401)
        .json({ message: 'This action is allowed only for logged in users.' });
    }

    const token = req.get('Authorization').split(' ')[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, 'somesupersecret')
    } catch (error) {
      return res.status(401)
        .json({ message: 'Token is invalid.', error });
    }

    let userId = decodedToken.userId;

    User.findById(userId)
      .then(user => {
        if (user.username !== req.params.user) {
          return res.status(401)
            .json({ message: 'You are now allowed too see this data.' });
        }

        next();
      })
  }

}