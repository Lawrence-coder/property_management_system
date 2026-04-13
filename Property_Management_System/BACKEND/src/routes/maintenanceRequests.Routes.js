import express from "express";
import { getTenantInfo, postMaintenanceIssue, resolvedIssue } from "../controllers/maintenanceRequests.Controllers.js";
import { protect } from "../middleware/auth.Middleware.js"
const router = express.Router();

router.get("/tenant-info", protect, getTenantInfo);
router.post("/", protect, postMaintenanceIssue);
router.patch("/resolve/:maintenance_requestsid/status", protect, resolvedIssue);

export default router;