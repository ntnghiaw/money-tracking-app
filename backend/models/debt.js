const mongoose = require('mongoose');



const DebtSchema = new mongoose.Schema({
    description: 'string',
    dueDate: 'date',
    name: 'string',
    paidAmount: 'string',
    totalAmount: 'string',
    type: 'string',
});
    

module.exports = mongoose.model('Debt', DebtSchema);

