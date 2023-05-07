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

import search from './search.js'
router.use('/search', search)

import style from './style.js'
router.use('/style', style)

import singer from './singer.js'
router.use('/singer', singer)

import album from "./album.js";
router.use('/album', album)

export default router;
