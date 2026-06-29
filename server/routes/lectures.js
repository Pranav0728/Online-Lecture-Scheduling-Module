import express from 'express';
import { createLecture, getLectures, getLecturesByInstructor, deleteLecture } from '../controllers/lectureController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/', auth, createLecture);
router.get('/', auth, getLectures);
router.get('/instructor/:id', auth, getLecturesByInstructor);
router.delete('/:id', auth, deleteLecture);

export default router;