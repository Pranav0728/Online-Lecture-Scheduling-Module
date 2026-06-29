import Instructor from '../models/Instructor.js';
import bcrypt from 'bcryptjs';

export const getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().select('-password');
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id).select('-password');
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const seedInstructors = async (req, res) => {
  try {
    const dummyInstructors = [
      { name: 'Rahul Sharma', email: 'rahul@gmail.com', password: '123456' },
      { name: 'Priya Patel', email: 'priya@gmail.com', password: '123456' },
      { name: 'Amit Singh', email: 'amit@gmail.com', password: '123456' },
      { name: 'Neha Gupta', email: 'neha@gmail.com', password: '123456' },
      { name: 'Raj Kumar', email: 'raj@gmail.com', password: '123456' }
    ];

    for (let instructor of dummyInstructors) {
      instructor.password = await bcrypt.hash(instructor.password, 10);
    }

    await Instructor.deleteMany({});
    const instructors = await Instructor.insertMany(dummyInstructors);
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};