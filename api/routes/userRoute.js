import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.get('/', getUser);
router.post('/update/:id', verifyToken, updateUser);

export default router;
