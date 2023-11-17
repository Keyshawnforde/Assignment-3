const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    manga: {
        type: String,
        required: true,
    },
    volumes: {
        type: Number,
        required: true,
    },
    finished: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);