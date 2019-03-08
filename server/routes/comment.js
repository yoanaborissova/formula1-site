const router = require('express').Router();
const commentController = require('../controllers/comment');
const restrictedPages = require('../middleware/restrictedPages')

router.get('/comment/:id', restrictedPages.isAuthed, commentController.getComment);
router.post('/comment/create', restrictedPages.isAuthed, commentController.createComment);
router.post('/comment/edit/:id', restrictedPages.isAuthed, commentController.editComment);
router.post('/comment/delete/:id', restrictedPages.isAuthed, commentController.deleteComment);

module.exports = router;