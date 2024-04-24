const mongoose = require('mongoose');


const SubCategory = new mongoose.Schema({
    description: 'string',
    icon: 'string',
    name: 'string',
})

const CategorySchema = new mongoose.Schema({
    description: 'string',
    icon: 'string',
    name: 'string',
    subCategories: [SubCategory],
});


module.exports = mongoose.model('Category', CategorySchema)

