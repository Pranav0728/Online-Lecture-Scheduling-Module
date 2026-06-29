import Course from '../models/Course.js';

export const createCourse = async (req, res) => {
  try {
    console.log('=== Request Body ===');
    console.log(req.body);
    console.log('=== Request File ===');
    console.log(req.file);
    console.log('=== All Request Files ===');
    console.log(req.files);

    const { name, level, description } = req.body;

    // Check if file exists
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Check what properties are available on req.file
    console.log('req.file keys:', Object.keys(req.file));
    console.log('req.file.path:', req.file.path);
    console.log('req.file.filename:', req.file.filename);
    console.log('req.file.url:', req.file.url);

    const image = req.file.path || req.file.url;
    if (!image) {
      console.error('No image URL found in req.file');
      return res.status(400).json({ message: 'Failed to get image URL' });
    }

    const course = new Course({
      name,
      level,
      description,
      image
    });

    console.log('=== Course to Save ===');
    console.log(course);

    await course.save();
    console.log('Course saved successfully');
    res.json(course);
  } catch (error) {
    console.error('=== FULL ERROR ===');
    console.error(error);
    console.error('=== ERROR MESSAGE ===');
    console.error(error.message);
    console.error('=== ERROR STACK ===');
    console.error(error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
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