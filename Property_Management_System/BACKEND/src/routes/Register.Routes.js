import express from "express";
import { submitUserRegistration } from "../controllers/register.Controllers.js";

const router = express.Router();

router.post("/", submitUserRegistration);

export default router;
