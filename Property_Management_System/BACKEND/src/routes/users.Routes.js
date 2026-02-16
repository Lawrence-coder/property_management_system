import express from 'express'
import { protect } from '../middleware/auth.Middleware.js'
import { getUsersDetails, updateUserDetails, deactivateProfile } from '../controllers/users.Controllers.js';

const router = express.Router();

router.get("/", protect, getUsersDetails);
router.put('/deactivate/:id', protect, deactivateProfile);
router.put('/:id', protect, updateUserDetails);


export default router;