const mongoose = require('mongoose');



const SettingSchema = new mongoose.Schema({
    name: 'string',
});
    

module.exports = mongoose.model('Setting', SettingSchema);

