const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  description: {
    type: Schema.Types.String,
    required: true
  },
  racers: {
     type: Schema.Types.String
  },
  imageUrl: {
    type: Schema.Types.String
  },
  points: {
    type: Schema.Types.Number,
    default: 0
  }
});

module.exports = mongoose.model('Team', teamSchema);