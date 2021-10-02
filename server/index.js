const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const port = 3000;
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome' });
});

app.get('/loaderio-21a884b39af0488d7834ab6caf215e36.txt', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
     
    const fileName = 'loaderio-21a884b39af0488d7834ab6caf215e36.txt';
    res.sendFile(fileName, options, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

require('./routes/index.js')(app);

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

module.exports = app;