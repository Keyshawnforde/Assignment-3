const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,//Makes it so it's required to do
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

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
