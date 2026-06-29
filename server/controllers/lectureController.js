import Lecture from '../models/Lecture.js';

export const createLecture = async (req, res) => {
  try {
    const { course, instructor, lectureDate } = req.body;

    const existingLecture = await Lecture.findOne({
      instructor,
      lectureDate: new Date(lectureDate)
    });

    if (existingLecture) {
      return res.status(400).json({ message: 'Instructor already has lecture on this date' });
    }

    const lecture = new Lecture({
      course,
      instructor,
      lectureDate: new Date(lectureDate)
    });

    await lecture.save();
    res.json(lecture);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate('course', 'name')
      .populate('instructor', 'name');
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLecturesByInstructor = async (req, res) => {
  try {
    const lectures = await Lecture.find({ instructor: req.params.id })
      .populate('course', 'name')
      .populate('instructor', 'name');
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    await Lecture.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lecture deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};