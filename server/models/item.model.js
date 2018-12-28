const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Item', ItemSchema);
