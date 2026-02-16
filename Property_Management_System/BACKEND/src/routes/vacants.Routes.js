import express from 'express';
import { protect } from '../middleware/auth.Middleware.js';
import { getVacantHouses } from '../controllers/vacants.Controllers.js';

const router = express.Router();
router.get('/', protect, getVacantHouses);

export default router;