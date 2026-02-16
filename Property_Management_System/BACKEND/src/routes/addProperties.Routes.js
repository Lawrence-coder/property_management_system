import express from 'express';
import { createProperties, fetchProperties, createHouses } from '../controllers/addProperties.Controllers.js';
import { protect } from '../middleware/auth.Middleware.js';


const router = express.Router();

router.post('/', protect, createProperties);
router.get('/created', protect, fetchProperties);
router.post('/createunit', protect, createHouses);

export default router;