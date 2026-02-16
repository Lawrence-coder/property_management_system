import express from 'express';
import { getVacatingDetails, submitVacatingRequest } from '../controllers/vacating.Controllers.js';
import { protect } from "../middleware/auth.Middleware.js";

const router = express.Router(); //creates a new router object

router.get('/details', protect, getVacatingDetails);
router.post('/create', protect, submitVacatingRequest);

export default router;