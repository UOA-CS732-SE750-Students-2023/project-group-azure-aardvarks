import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
//import * as url from 'url';
import cors from 'cors';
//import {User1, Playlist} from "./Database/Schema.js";
import bodyParser from 'body-parser';
// Setup Express
export const app = express();
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
import routes from './routes/index.js';
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');

    // Make all files in that folder public
    // app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist')));
    // app.use(express.static(path.join(__dirname, '../../client/dist')));
    app.use(express.static(new URL('../../client/dist', import.meta.url).pathname));


    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get('*', (req, res) => {
        res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist/index.html'));
    });
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
    // });
}



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));

//app.listen(port, () => console.log(`App server listening on port ${port}!`));

// import path from 'path';
import { fileURLToPath } from 'url';

// Make the "public" folder available statically
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));

// Serve up the frontend's "dist" directory, if we're running in production mode.
// if (process.env.NODE_ENV === 'production') {
//     console.log('Running in production!');
//
//     // Make all files in that folder public
//     // app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist')));
//     app.use(express.static(path.join(__dirname, '../../client/dist')));
//
//     // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
//     // app.get('*', (req, res) => {
//     //     res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist/index.html'));
//     // });
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
//     });
// }
