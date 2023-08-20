const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


//Route file
const homeRoutes = require('./src/routes/router-home');
const taskRoutes = require('./src/routes/router-task');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//views
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// Route
app.use('/', homeRoutes);
app.use('/task', taskRoutes);

app.listen(5000, () => {
    console.log('runs well@ Port : ' + 5000);
});