'use strict';

require('dotenv').config();
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.listen(3000, function () {
    console.log('Listening on port: 3000');
});