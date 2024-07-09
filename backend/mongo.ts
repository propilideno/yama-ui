// Code  for mongoose config in backend
// Filename - backend/index.js
 
// To connect with your mongoDB database
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const DB_URI = process.env.DBConnection;
const DB_PORT = process.env.ServerPort || 5000;

mongoose.connect(DB_URI, {dbName: 'propilideno'})

// Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));


// Mongoose schema and model
const ConversationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  conversationHistory: { type: Array, required: true },
});
const Conversation = mongoose.model('yama-history', ConversationSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Backend server is running');
});
 
app.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const conversation = new Conversation(req.body)
    await conversation.save();
    res.status(201).json({ message: 'Conversation saved successfully' });
  } catch (error) {
    console.error('Error saving conversation:', error);
    res.status(500).json({ error: 'Failed to save conversation' });
  }
});
app.listen(5000);
console.log("App listen at port 5000");
