const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product: {
      type: Schema.Types.String,
      required: true
    },
    user: {
      type: Schema.Types.String,
      required: true
    },
    price: {
      type: Schema.Types.Number,
      required: true
    },
    status: {
      type: Schema.Types.String,
      default: "Pending"
    },
    date: {
        type: Schema.Types.Date,
        default: Date.now
    }
});
  
  module.exports = mongoose.model('Order', orderSchema);  