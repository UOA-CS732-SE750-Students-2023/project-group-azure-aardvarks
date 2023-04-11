import express from 'express';

const router = express.Router();

import User from './user';
router.use('/user', User);

import music from './music';
router.use('/music', music);

import playList from './playList';
router.use('/playList', playList);

import comment from './comment.js'
router.use('/comment', comment);

export default router;
