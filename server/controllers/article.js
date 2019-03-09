const Article = require('../models/Article');
const Comment = require('../models/Comment');

module.exports = {
  getArticles: (req, res) => {
    Article.find()
      .then((articles) => {
        let resArticles = articles.sort((a, b) => b.date - a.date)  
        res
          .status(200)
          .json({ message: 'Fetched articles successfully.', resArticles });
      })
      .catch((error, res) => {
        res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
      });
  },
  createArticle: (req, res) => {
    const articleObj = req.body;
    Article.create(articleObj)
    .then((article) => {
      res.status(200)
        .json({
          message: 'Article created successfully!',
          article
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
  articleDetails: (req, res) => {
    const articleId = req.params.id;
    
    Article.findById(articleId)
    .then((article) => {
      let arr = [];
      Comment.find()
        .then((comments) => {
          
          comments = comments.filter(function(ele){
            return ele.article == articleId;
        }).sort((a, b) => (b.date - a.date))
        res.status(200)
        .json({
          message: 'Details fetched successfully.',
          article,
          comments
        })
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
  editArticle: (req, res) => {
    const articleId = req.params.id;
    
    Article.findById(articleId)
    .then((article) => {
        article.title = req.body.title;
        article.content = req.body.content;
        article.imageUrl = req.body.imageUrl;

        article.save()
        .then(() => {
          res.status(200)
        .json({
          message: 'Article edited successfully.',
          article,
        })
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
  deleteArticle: (req, res) => {
    const articleId = req.params.id;
    
    Article.findByIdAndDelete(articleId)
    .then(() => {
        Comment.deleteMany({
          article: articleId
        })
        .then(() => {
          res.status(200)
          .json({
            message: 'Article deleted successfully.',
          })
        })
    })
    .catch((error) => {
      res.status(500)
          .json({
            message: 'Something went wrong.',
            error
          })
    });
  }
}
