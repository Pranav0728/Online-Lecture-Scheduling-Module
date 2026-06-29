import express from 'express';
import { getInstructors, getInstructorById, seedInstructors } from '../controllers/instructorController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, getInstructors);
router.get('/seed', seedInstructors);
router.get('/:id', auth, getInstructorById);

export default router;