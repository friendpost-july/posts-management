const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URL;

async function dbInit() {
  console.log('Connecting to DB....');
  try {
    mongoose.connect(mongo_url);
    console.log('Database connected');
  } catch (error) {
    console.log('Error in connecting to the database');
  }
}

module.exports = dbInit;
