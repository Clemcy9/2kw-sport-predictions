import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/userModel.js";
import authMiddleware, { createToken } from "../middleware/authMiddleware.js";
import { Router } from "express";
import {
  confirmEmailController,
  forgotPasswordController,
  loginController,
  registerController,
  resetPasswordController,
} from "../controllers/authControllers.js";

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
 * /api/v1/auth/confirm-email/{userid}:
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
router.post("/confirm-email/:userId", confirmEmailController);

// login route

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "clement@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Unauthorized (invalid credentials)
 */
router.post("/login", loginController);

// forget-password route
/**
 * @swagger
 * /api/v2/auth/forgot-password:
 *   post:
 *     summary: Request password reset, recieve token in email
 *     description: Endpoint to request for password reset, email is required
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               email: "clement@gmail.com"
 *     responses:
 *       200:
 *         description: reset token sent to email
 *       400:
 *         description: request email does not exist

 * */
router.post("/forgot-password", forgotPasswordController);

// password reset route

/**
 * @swagger
 * /api/v2/auth/reset-password/{email}:
 *   post:
 *     summary: Reset password, identify associated user with token or email
 *     description: Endpoint that does the actual password reset using the token sent to the user's email.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: user's email for password reset
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: "to God be the Glory"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 msg: "password reset successful"
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Invalid or expired token"
 */
router.post("/reset-password/:email", resetPasswordController);

export default router;
