// const mongoose = require('mongoose');
// const Schema = require('mongoose');
// const { MembershipSchema } = require('./membership');

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String
//   },
//   password: {
//     type: String
//   },
//   fullname: {
//     type: String
//   },
//   dob: {
//     type: Date
//   },
//   avatarUrl: {
//     type: String
//   },
//   wallets: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Wallet'
//   }],
//   membership: [MembershipSchema],
//   categories: [{
//       type: Schema.Types.ObjectId,
//       ref: 'Category'
//   }],
//   settings: [{
//       type: Schema.Types.ObjectId,
//       ref: 'Setting'
//   }]
// });



// module.exports = mongoose.model('User', UserSchema);
