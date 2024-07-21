const {Category} = require('../models/category');

exports.createCategory = async (req, res) => {
    const {description, icon, name} = req.body;

    //create new transaction
    const category = new Category({description, icon, name});
    try {
      await category.save()
      return res.status(201).json({message: 'created category successfully', category})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "can't create category, please check invalid fields again"})
    }

}