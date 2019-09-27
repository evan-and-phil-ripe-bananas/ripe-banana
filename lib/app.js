const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

// MIDDLEWARE
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(checkConnection);

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// API ROUTES
const reviewers = require('./routes/reviewers');
const studios = require('./routes/studios');
const actors = require('./routes/actors');
const films = require('./routes/films');
app.use('/api/reviewers', reviewers);
app.use('/api/studios', studios);
app.use('/api/actors', actors);
app.use('/api/films', films);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;