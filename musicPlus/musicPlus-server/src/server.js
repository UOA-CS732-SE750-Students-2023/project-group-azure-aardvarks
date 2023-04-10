import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
//import path from 'path';
import mongoose from 'mongoose';
//import * as url from 'url';
import cors from 'cors';
import {User1, Playlist} from "./Database/Schema.js";

// Setup Express
const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());

// Setup body-parser
app.use(express.json());

// Setup our routes.
import routes from './routes';
app.use('/', routes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));

//app.listen(port, () => console.log(`App server listening on port ${port}!`));
