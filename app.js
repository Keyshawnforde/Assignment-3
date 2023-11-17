// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

// directory connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to directory!"));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my-secret-key', // Store session secret in variable
    saveUninitialized: true,
    resave: false
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static("uploads"));
app.use(express.static("public"));

// set template engine
app.set('view engine', 'ejs');

// route prefix
app.use("", require("./routes/routes"));

// Handle form submission for adding manga
app.post('/add_manga', async (req, res) => {
  try {
    const { MangaName, Volumes, Finished } = req.body;

    // Validate the inputs if needed

    // Create a new Manga instance and save it to the directory
    const newManga = new Manga({ name: MangaName, volumes: Volumes, finished: Finished });
    await newManga.save();

    req.session.message = {
      type: "success",
      message: "Manga added successfully",
    };
    res.redirect('/');
  } catch (error) {
    req.session.message = {
      type: "danger",
      message: `Error: ${error.message}`,
    };
    res.redirect('/');
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});