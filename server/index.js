const express = require('express');
const path = require('path');
const port = 3000;
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome' });
});

app.get(`/${process.env.LOADERIO}.txt`, (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
     
    const fileName = `${process.env.LOADERIO}.txt`;
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