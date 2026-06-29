import Course from '../models/Course.js';

// export const createCourse = async (req, res) => {
//   try {
//     console.log('=== Request Body ===');
//     console.dir(req.body, { depth: null });
//     console.log('=== Request File ===');
//     console.dir(req.file, { depth: null });

//     const { name, level, description } = req.body;

//     // Check if file exists
//     if (!req.file) {
//       console.error('No file uploaded');
//       return res.status(400).json({ message: 'Image file is required' });
//     }

//     // Get Cloudinary URL (use secure_url for HTTPS)
//     const image = req.file.secure_url || req.file.url || req.file.path;
//     console.log('Using image URL:', image);

//     if (!image) {
//       console.error('No image URL found in req.file');
//       return res.status(400).json({ message: 'Failed to get image URL' });
//     }

//     const course = new Course({
//       name,
//       level,
//       description,
//       image
//     });

//     console.log('=== Course to Save ===');
//     console.dir(course, { depth: null });

//     await course.save();
//     console.log('Course saved successfully');
//     res.json(course);
//   } catch (error) {
//     console.error('=== FULL ERROR ===');
//     console.dir(error, { depth: null });
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
export const createCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;

    const course = await Course.create({
      name,
      level,
      description,
      image,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
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

    const { name, level, description, image } = req.body;
    let updatedImage = course.image;
    
    if (image) {
      updatedImage = image;
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, level, description, image: updatedImage },
      { new: true }
    );

    res.json(course);
  } catch (error) {
    console.dir(error, { depth: null });
    res.status(500).json({ message: 'Server error', error: error.message });
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