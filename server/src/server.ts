import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const startServer = async (): Promise<void> => {
  try {
    console.log('Starting server...');
    await connectDB();
    const port = env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server started successfully and running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
