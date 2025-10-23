import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/userModel.js";
import authMiddleware, { createToken } from "../middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

// register route
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               name: "Aboy CM"
 *               email: "aboy_cm@gmail.com"
 *               password: "no guilt in life"
 *   responses:
 *     201:
 *       description: User registered successfully
 */
router.post("/register", registerController);
// confirm email route

// login route

// forget-password route

// password reset route
