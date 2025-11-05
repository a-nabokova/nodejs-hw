import { Router } from 'express';
import { getAllNotes , getNoteById } from '../controllers/notesController.js';

const router = Router();

export default router;

router.get('/notes',  getAllNotes );


router.get('/notes/:noteId', getNoteById);

