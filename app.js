'use strict';

require('dotenv').config();
const request = require('request');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.listen(3000, function () {
    console.log('Listening on port: 3000');
});