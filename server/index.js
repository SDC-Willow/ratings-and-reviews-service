const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome' });
});

require('./routes/index.js')(app);

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

// module.exports = app;