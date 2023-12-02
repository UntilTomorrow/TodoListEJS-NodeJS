const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 8090;
const dotenv = require('dotenv');

dotenv.config();

const checkApiKey = require('./src/configs/check')


//Route file
const homeRoutes = require('./src/routes/web');
const taskRoutes = require('./src/routes/web');

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});