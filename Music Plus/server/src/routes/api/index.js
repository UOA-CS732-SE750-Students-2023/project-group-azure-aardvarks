import express from 'express';

const router = express.Router();

import User from './user';
router.use('/User', User);

import music from './music';
router.use('/Music', music);
import playlist from './playlist';
router.use('/Playlist', playlist);
export default router;
