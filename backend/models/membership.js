const mongoose = require('mongoose');


const MembershipSchema = new mongoose.Schema({
    createAt: 'date',
    name: 'string',
    type: 'string',
});

const Membership = mongoose.model('Membership', MembershipSchema)

module.exports = { Membership, MembershipSchema};
