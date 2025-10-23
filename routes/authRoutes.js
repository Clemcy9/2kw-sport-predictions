import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/userModel.js";
import authMiddleware, { createToken } from "../middleware/authMiddleware.js";
import { Router } from "express";
import { registerController } from "../controllers/authControllers.js";

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
/**
 * @swagger
 * /api/v1/auth/confirm-email/{userid}
 *   post:
 *     summary: Confirm user's email using a verification token
 *     description: Verifies the email address of a user by matching the verification token sent to their email. Activates the user's account if valid.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose email is being verified
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "A7X9ZT"
 *                 description: The 6–8 character verification code sent to the user's email
 *     responses:
 *       200:
 *         description: Email confirmed successfully. The user's account is now active.
 *       400:
 *         description: Invalid or expired token
 *       500:
 *         description: Server error during verification
 */
router.post("/confirm-email/:userId");
