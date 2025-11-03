let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    // For now, just log instead of connecting
    console.log('MongoDB connection would be established here');
    isConnected = true;
    // await mongoose.connect(process.env.MONGODB_URI!);
    // isConnected = true;
    // console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}