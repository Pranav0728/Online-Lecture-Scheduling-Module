import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import instructorRoutes from './routes/instructors.js';
import courseRoutes from './routes/courses.js';
import lectureRoutes from './routes/lectures.js';

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ title: 'Course Management API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
