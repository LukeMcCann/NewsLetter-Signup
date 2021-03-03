'use strict';

require('dotenv').config();
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

const mailchimp_url = "https://us1.api.mailchimp.com/3.0";
const list_id = process.env.MAILCHIMP_LIST_ID;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
    const { firstName, lastName, email } = req.body;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName, 
                    LNAME:lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const options = {
        method: "POST", 
        auth: `lmccann:${process.env.MAILCHIMP_API_KEY}`
    }

    const request = https.request(`${mailchimp_url}/lists/${list_id}`, options, function (response) {
        response.on('data', function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

    if (response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html');
    } else {
        res.sendFile(__dirname + '/failure.html');
    }
});

app.post('/failure', function (req, res) {
    res.redirect('/');
});

app.listen(3000, function () {
    console.log('Listening on port: 3000');
});