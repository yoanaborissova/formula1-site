const Comment = require('../models/Comment');
const Article = require('../models/Article');
const User = require('../models/User');

module.exports = {
  getComment: (req, res) => {
    Comment.findById(req.params.id)
      .then((comment) => {
        res
          .status(200)
          .json({ message: 'Fetched comment successfully.', comment });
      })
      .catch((error) => {
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
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
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
      });
  },
  editComment: async (req, res) => {
    const commentId = req.params.id;

    let reqUser = await User.findOne({username: req.body.user});

    Comment.findById(commentId)
      .then((comment) => {
      if (comment.user === reqUser.username) {
        comment.content = req.body.content;

        comment.save()
          .then(() => {
            res.status(200)
              .json({
                message: 'Comment edited successfully.',
                comment,
              })
          })
        } else {
          res.status(500)
          .json({
            message: 'You are not allowed to edit this comment.'
          })
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
      });
  },
  deleteComment: async (req, res) => {
    const commentId = req.params.id;

    let reqUser = await User.findOne({username: req.body.user});

    Comment.findById(commentId)
      .then((comment) => {
        if (comment.user === reqUser.username || reqUser.roles.indexOf('Admin') !== -1) {
          Comment.findByIdAndDelete(commentId)
            .then(() => {
              Article.findById(req.body.selectedArticle._id)
                .then((article) => {
                  article.comments = article.comments.filter(function (ele) {
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
        } else {
          res.status(500)
          .json({
            message: 'You are not allowed to delete this comment'
          })
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
      });
  }
}

