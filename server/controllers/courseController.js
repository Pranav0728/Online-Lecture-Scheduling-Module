import Course from '../models/Course.js';

export const createCourse = async (req, res) => {
  try {
    const { name, level, description } = req.body;
    const image = req.file.path; // Cloudinary URL

    const course = new Course({
      name,
      level,
      description,
      image
    });

    await course.save();
    res.json(course);
  } catch (error) {
    console.error("Error from controller",error);
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
      image = req.file.path; // Cloudinary URL
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, level, description, image },
      { new: true }
    );

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};