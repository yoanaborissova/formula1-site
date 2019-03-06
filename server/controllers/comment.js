const Comment = require('../models/Comment');
const Article = require('../models/Article');

module.exports = {
  getComment: (req, res) => {
    Comment.findById(req.params.id)
      .then((comment) => {
        res
          .status(200)
          .json({ message: 'Fetched comment successfully.', comment });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createComment: (req, res) => {
  const commentObj = req.body;    
  Comment.create(commentObj)
    .then(async (comment) => {
      let commentedArticle = await Article.findById(commentObj.article);
      commentedArticle.comments.push(comment._id);
      await commentedArticle.save();  
      res.status(200)
        .json({
          message: 'Comment added successfully!',
          comment
        })
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      console.error;
    });
  },
  editComment: (req, res) => {
    const commentId = req.params.id;
    
    Comment.findById(commentId)
    .then((comment) => {
        comment.content = req.body.content;

        comment.save()
        .then(() => {
          res.status(200)
        .json({
          message: 'Comment edited successfully.',
          comment,
        })
        })
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      throw error;
    });
  }, 
  deleteComment: (req, res) => {
    const commentId = req.params.id;
    
    Comment.findByIdAndDelete(commentId)
    .then(() => {
        Article.findById(req.body.selectedArticle._id)
          .then((article) => {
            article.comments = article.comments.filter(function(ele){
              return ele != commentId;
          });

          article.save()
            .then(() => {
              res.status(200)
                .json({
                   message: 'Comment deleted successfully.',
                })
            })
          })
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      throw error;
    });
  }
}

