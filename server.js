const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();


//Route file

app.use(express.json());
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route


app.listen(3000, () => {
    console.log('runs well@ Port : ' + 5000);
});