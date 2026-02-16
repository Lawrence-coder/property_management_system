import express from "express";
import { getAvailableHouses } from "../controllers/houses.Controllers.js";

const router = express.Router();

router.get("/:propertyId", getAvailableHouses);

export default router;