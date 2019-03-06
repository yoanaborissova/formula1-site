const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  description: {
    type: Schema.Types.String,
    required: true
  },
  price: {
    type: Schema.Types.Number,
    required: true
  },
  date: {
    type: Schema.Types.Date,
    default: Date.now 
  },
});

module.exports = mongoose.model('Product', productSchema);