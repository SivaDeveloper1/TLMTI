const mongoose = require('mongoose');

const url = 'mongodb+srv://tlmtiuser:tlmtipassword@cluster0.rgdlwgu.mongodb.net/doctor?retryWrites=true&w=majority'; // Update with your MongoDB connection URL
const dbName = 'doctor'; // Update with your database name

let db = null;

async function connectDB() {
  try {
    await mongoose.connect(url);
    db = mongoose.connection;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

module.exports = { connectDB, getDB };
