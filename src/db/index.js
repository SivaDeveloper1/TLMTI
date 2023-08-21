const mongoose = require('mongoose');

const url = 'mongodb://tlmti.onrender.com:27017'; // Update with your MongoDB connection URL
const dbName = 'doctor'; // Update with your database name

let db = null;

async function connectDB() {
  try {
    await mongoose.connect(`${url}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
