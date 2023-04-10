import express from 'express';

const router = express.Router();

import User from './user';
router.use('/user', User);

import music from './music';
router.use('/music', music);

export default router;
