import Instructor from '../models/Instructor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const admin = {
  email: 'admin@gmail.com',
  password: '123456',
  role: 'admin'
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === admin.email && password === admin.password) {
      const token = jwt.sign(
        { email: admin.email, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        token,
        user: { email: admin.email, role: admin.role, name: 'Admin' }
      });
    }

    const instructor = await Instructor.findOne({ email });
    console.dir(instructor, { depth: null });
    
    if (!instructor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, instructor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: instructor._id, role: instructor.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        role: instructor.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};