const express = require('express');
const path = require('path');
require('dotenv').config();

const port = 3000;

const app = express();
require('./routes/index.js')(app);

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

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

module.exports = app;