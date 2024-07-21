const mongoose = require('mongoose');
const {CategorySchema} = require('./category')
const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: CategorySchema
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String
  },
  type: {
    type: String,
    required: true,
    default: 'Income',
  }
});



module.exports = mongoose.model('Transaction', TransactionSchema);
