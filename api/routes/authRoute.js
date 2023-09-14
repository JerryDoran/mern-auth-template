import express from 'express';
import {
  signUp,
  signIn,
  signUpWithGoogle,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', signUpWithGoogle);

export default router;
