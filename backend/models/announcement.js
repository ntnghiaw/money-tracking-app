const mongoose = require('mongoose');



const AnnouncementSchema = new mongoose.Schema({
    content: 'string',
    createAt: 'date',
    name: 'string',
});
    

module.exports = mongoose.model('Announcement', AnnouncementSchema);

