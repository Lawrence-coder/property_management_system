import express from 'express';
import { getProfile } from '../controllers/profile.Controllers.js';
import { protect } from '../middleware/auth.Middleware.js';


const router = express.Router(); //it creates a new router object whos work is to handle requests related to user profiles.

router.get('/', protect, getProfile);


export default router;