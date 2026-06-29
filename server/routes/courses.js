import express from 'express';
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } from '../controllers/courseController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/', auth, createCourse);
router.get('/', auth, getCourses);
router.get('/:id', auth, getCourseById);
router.put('/:id', auth, updateCourse);
router.delete('/:id', auth, deleteCourse);

export default router;