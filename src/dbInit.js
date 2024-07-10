const mongoose = require('mongoose');

async function dbInit() {
  console.log('Connecting to DB....');
  try {
    mongoose.connect('mongodb://127.0.0.1:37017');
    console.log('Database connected');
  } catch (error) {
    console.log('Error in connecting to the database');
  }
}

module.exports = dbInit;
