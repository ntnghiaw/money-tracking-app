const Realm = require('realm');


class User extends Realm.Object {
  static schema = {
    name: "User",
    properties: {
      _id: { type: "objectId", indexed: true, default: () => new Realm.BSON.ObjectId() },
      email: "string",
      password: "string",
      fullname: "string",
      dateOfBirth: "date?",
      phoneNumber: "string?",
      avatarUrl: "string?",
      wallets: { type: "list", objectType: "Wallet", default:  () => []},
      // membership: { type: "list", objectType: "Membership"},
      settings: "string?",
    },
    primaryKey: "_id",
  };
}

module.exports = User;