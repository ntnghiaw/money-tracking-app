const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  debts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Debt' }],
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: String,
  }],
  plan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }],
  type: {
    type: String,
    required: true,
  }
});

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;
