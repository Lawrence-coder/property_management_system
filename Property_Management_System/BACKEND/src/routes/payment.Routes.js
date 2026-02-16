import express from 'express';
import { getRentPayment, submitRentPayment } from '../controllers/payment.Controllers.js';
import { protect } from '../middleware/auth.Middleware.js';
import { upload } from '../middleware/uploads.Middleware.js';

const router = express.Router();

router.get('/', protect, getRentPayment);
router.post('/', protect, upload.single('receipt'), submitRentPayment);

export default router;