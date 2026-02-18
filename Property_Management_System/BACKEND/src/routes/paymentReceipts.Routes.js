import express from 'express';
import { protect } from '../middleware/auth.Middleware.js';
import { fetchMonthlyReport } from '../controllers/paymentReceipts.Controllers.js';

const router = express.Router();

router.get('/monthly-report', protect, fetchMonthlyReport);

export default router;