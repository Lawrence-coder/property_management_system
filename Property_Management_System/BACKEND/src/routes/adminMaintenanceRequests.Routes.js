import express from "express";
import { getIssues, changeStatus, getFrequency } from "../controllers/adminMaintenanceRequests.Controllers.js";

import { protect } from "../middleware/auth.Middleware.js";
const router = express.Router();
router.get("/issuesrequests", protect, getIssues);
router.get("/issuesrequests/frequency", protect, getFrequency);
router.patch("/issuesrequests/:id/status", protect, changeStatus);

export default router;