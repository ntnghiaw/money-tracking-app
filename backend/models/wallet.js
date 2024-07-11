const mongoose = require('mongoose');
const Schema = require('mongoose')


const WalletSchema = new mongoose.Schema({
    announcements: [{
        type: Schema.Types.ObjectId,
        ref: 'Announcement'
    }],
    balance: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'vnd'
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    debts: [{
        type: Schema.Types.ObjectId,
        ref: 'Debt'
    }],
    members: [{
        type: Schema.Types.ObjectId,
        role: String,
        ref: 'User',
        require: false
    }],
    name: {
        type: String,
        required: true
    },
    plans: [{
        type: Schema.Types.ObjectId,
        ref: 'Plan',
    }],
    type: {
        type: String,
        required: true,
        default: 'personal'
    },
},
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Wallet', WalletSchema);
