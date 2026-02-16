import express from 'express';
import { getVacatingNotices, updateNoticeStatus, updateNoticeDeclineStatus } from '../controllers/notices.Controllers.js';
import { protect } from '../middleware/auth.Middleware.js';

const router = express.Router();

router.get('/', protect, getVacatingNotices);
router.put('/approve/:id', protect, updateNoticeStatus);
router.put('/decline/:id', protect, updateNoticeDeclineStatus);

export default router;