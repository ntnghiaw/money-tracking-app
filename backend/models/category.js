const mongoose = require('mongoose');


const SubCategory = new mongoose.Schema({
    description: 'string',
    icon: 'string',
    name: 'string',
})

const CategorySchema = new mongoose.Schema({
    description: {
        type: String
    },
    icon: {
        type: String, 
    },
    name: {
        type: String,
        required: true,
        default: 'Default'
    },
    subCategories: [SubCategory],
});

const Category = mongoose.model('Category', CategorySchema)

module.exports = { Category, CategorySchema }

