import { Router } from 'express';
import authController from 'controllers/auth.controller';

const router = Router();

// Resgister
router.post('/register', authController.addUser);

// Login
router.post('/login', authController.loginUser);

export default router;
