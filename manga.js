const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  name: { type: String, required: true }, //Makes it so only strings can be entered
  volumes: { type: Number, required: true }, //Makes it so only whole numbers can be entered
  finished: { type: String, required: true }, //Makes it so only strings can be entered
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;