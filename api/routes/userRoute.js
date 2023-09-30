import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.get('/', getUser);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
