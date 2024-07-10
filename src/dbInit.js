import mongoose from 'mongoose';
const mongo_url = process.env.MONGO_URL;

export const dbInit = async () => {
  console.log('Connecting to DB....');
  try {
    await mongoose.connect(mongo_url);
    console.log('Database connected');
  } catch (error) {
    console.log('Error in connecting to the database', error);
  }
};
