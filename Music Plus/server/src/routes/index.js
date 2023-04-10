import express from 'express';

const router = express.Router();
import basicAuth from 'basic-auth';

import api from './api';
router.use('/api', api);


export default router;
