const express = require('express');
const bodyParser = require("body-parser");
const port = 3000;
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome' });
});

require('./routes/index.js')(app);

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

module.exports = app;