// app.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./conf');
const Item = require('./models/item');

const app = express();
const PORT = process.env.PORT || 3000;


// MongoDB Connection
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Define a Mongoose Schema and Model
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

// Express Routes
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Route to retrieve all items from MongoDB
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a new item to MongoDB
app.post('/items', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

