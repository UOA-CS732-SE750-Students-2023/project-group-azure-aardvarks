import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
//import path from 'path';
import mongoose from 'mongoose';
//import * as url from 'url';
import cors from 'cors';
//import {User1, Playlist} from "./Database/Schema.js";
import bodyParser from 'body-parser';

// Setup Express
const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
// Setup body-parser
app.use(express.json());

// print logs
import fs from 'fs'
import morgan from 'morgan'
// create log file automatically
const logFilePath = process.cwd()+'/logs'
if (!fs.existsSync(logFilePath)) {
    fs.mkdirSync(logFilePath);
}
const accessLogStream = fs.createWriteStream(logFilePath + '/access.logs', { flags: 'a' }); // writing log to access.log file
app.use(morgan('short', { stream: accessLogStream }));

// Setup our routes.
import routes from './routes';
app.use('/', routes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));

//app.listen(port, () => console.log(`App server listening on port ${port}!`));
