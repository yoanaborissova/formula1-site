const router = require('express').Router();
const commentController = require('../controllers/comment');
const isAuth = require('../middleware/is-auth');

router.get('/comment/:id', commentController.getComment);
router.post('/comment/create', commentController.createComment);
router.post('/comment/edit/:id', commentController.editComment);
router.post('/comment/delete/:id', commentController.deleteComment);

module.exports = router;