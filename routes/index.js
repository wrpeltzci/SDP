import express from "express";
import userRoutes from "./users.js";
import authRoutes from "./auth.js";

const router = express.Router();
userRoutes(router);
authRoutes(router);

export default router;
