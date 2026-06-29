import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { cloudinary } from './config/cloudinary.js';
import authRoutes from './routes/auth.js';
import instructorRoutes from './routes/instructors.js';
import courseRoutes from './routes/courses.js';
import lectureRoutes from './routes/lectures.js';

connectDB();

// Check Cloudinary config
console.log('=== Cloudinary Config Check ===');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'NOT SET');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'NOT SET');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'NOT SET');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ title: 'Course Management API' });
});

// Test Cloudinary config
app.get('/api/test-cloudinary', async (req, res) => {
  try {
    console.log('=== Testing Cloudinary ===');
    const result = await cloudinary.api.ping();
    console.log('Cloudinary Ping Result:', result);
    res.json({ success: true, message: 'Cloudinary is working!', result });
  } catch (error) {
    console.error('Cloudinary Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Cloudinary not working', 
      error: error.message,
      config: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'NOT SET',
        apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'NOT SET',
        apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'NOT SET'
      }
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
