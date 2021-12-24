const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 1337;

var app = express()

app.get('/', (req, res) => res.json(process.env))

app.get('/throwError', (req, res) => {
    setTimeout(() => fs.openSync(process.env.HOME + '/non-exist-file.txt'), 3000);
    res.send('OK');
})

app.listen(port, () => {
    var moduleLoadedLogFilePath = process.env.HOME + '/LogFiles/ModuleLoaded.log';
    if (fs.existsSync(moduleLoadedLogFilePath)) {
        fs.unlinkSync(moduleLoadedLogFilePath);
    }
    for (let m of Object.keys(require('module')._cache))
    {
        fs.appendFileSync(moduleLoadedLogFilePath, m + '\n');
    }
});
