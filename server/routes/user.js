import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getUser, recommend } from '../controllers/user.js';

const router = express.Router();

//get  user
router.get('/', verifyToken, getUser);
router.post('/recommend', verifyToken, recommend);

export default router;
