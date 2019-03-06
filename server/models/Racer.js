const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const racerSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  information: {
    type: Schema.Types.String,
    required: true
  },
  points: {
    type: Schema.Types.Number,
    default: 0
  },
  team: {
    type: Schema.Types.String,
    required: true
  },
  imageUrl: {
    type: Schema.Types.String,
  }
});

module.exports = mongoose.model('Racer', racerSchema);