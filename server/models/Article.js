const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true
  },
  content: {
    type: Schema.Types.String,
    required: true
  },
  date: {
    type: Schema.Types.Date,
    default: Date.now 
  },
  imageUrl: {
    type: Schema.Types.String
  },
  comments: [
    {type: Schema.Types.ObjectId, ref: 'Comment'}
  ]
});

module.exports = mongoose.model('Article', articleSchema);