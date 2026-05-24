import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME || 'ai-meeting-intelligence',
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    console.warn('Continuing without MongoDB in development mode.');
  }
};

export default connectDB;