// models/manga.js
const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  volumes: { type: String, required: true },
  finished: { type: String, required: true },
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;