const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 1337;

var app = express()

app.get('/', (req, res) => res.json(process.env))

app.get('/throwError', (req, res) => {
    fs.openSync(process.env.HOME + '/non-exist-file.txt');
    res.send('OK');
})

app.listen(port);