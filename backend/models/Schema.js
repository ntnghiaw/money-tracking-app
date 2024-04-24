
const User = new Schema({

    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    fullname: {
      type: 'string'
    },
    dateOfBirth: {
      type: 'date'
    },
    avatarUrl: {
      type: 'string'
    },
    wallets: [{
      type: ObjectId,
      ref: 'Wallet'
    }],
    membership: [Membership],
    categories: [{
        type: ObjectId,
        ref: 'Category'
    }],
    settings: [{
        type: ObjectId,
        ref: 'Setting'
    }]
})

const Announcement = new Schema({
content: 'string',
createAt: 'date',
name: 'string',
});

const Category = new Schema({
description: 'string',
icon: 'string',
name: 'string',
subCategories: [SubCategory],
});

const SubCategory = new Schema({
description: 'string',
icon: 'string',
name: 'string',
});

const Debt = new Schema({
description: 'string',
dueDate: 'date',
name: 'string',
paidAmount: 'string',
totalAmount: 'string',
type: 'string',
});

const Membership = new Schema({
createAt: 'date',
name: 'string',
type: 'string',
});

const Setting = new Schema({
name: 'string',
});

const Wallet = new Schema({
announcements: [{
    type: ObjectId,
    ref: 'Announcement'
}],
balance: 'double',
debts: [{
    type: ObjectId,
    ref: 'Debt'
}],
members: [{
    type: ObjectId,
    role: 'string',
    ref: 'User',
}],
name: 'string',
plans: [{
    type: ObjectId,
    ref: 'Plan',
}],
type: 'string',
});





