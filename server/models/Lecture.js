import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  lectureDate: {
    type: Date,
    required: true
  }
});

export default mongoose.model('Lecture', lectureSchema);