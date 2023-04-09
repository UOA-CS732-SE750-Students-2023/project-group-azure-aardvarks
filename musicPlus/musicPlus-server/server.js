import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import * as url from 'url';
import cors from 'cors';

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
