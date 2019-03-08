const router = require('express').Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const restrictedPages = require('../middleware/restrictedPages');

router.post('/signup', restrictedPages.isAnonymous,
  [
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password.'),
    body('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid username.')
  ]
, authController.signUp);
router.post('/signin', restrictedPages.isAnonymous, authController.signIn);

module.exports = router;
