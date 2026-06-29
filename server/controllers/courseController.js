import Course from '../models/Course.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createCourse = async (req, res) => {
  try {
    const { name, level, description } = req.body;
    const image = req.file.filename;

    const course = new Course({
      name,
      level,
      description,
      image
    });

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const { name, level, description } = req.body;
    let image = course.image;
    
    if (req.file) {
      const oldPath = path.join(__dirname, '../uploads', course.image);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      image = req.file.filename;
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, level, description, image },
      { new: true }
    );

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const imagePath = path.join(__dirname, '../uploads', course.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};