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
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
module.exports = mongoose.model('User', userSchema);