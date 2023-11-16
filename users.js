const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Manga: {
        type: String,
        required: true,
    },
    Chapters: {
        type: String,
        required: true,
    },
    Finished: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('User', userSchema);