import express from 'express';
import { userLogin } from '../controllers/login.Controllers.js';

const router = express.Router();
router.post('/', userLogin);

export default router;