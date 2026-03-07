import express from "express";
import { getTenantInfo, postMaintenanceIssue } from "../controllers/maintenanceRequests.Controllers.js";
import { protect } from "../middleware/auth.Middleware.js"
const router = express.Router();

router.get("/tenant-info", protect, getTenantInfo);
router.post("/", protect, postMaintenanceIssue);

export default router;