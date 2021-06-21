require('./api/models/db');
require('./api/config/passport');

const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');

const routesApi = require('./api/routes/index');

const app = express();

// voir la configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use("/api", routesApi);

// récupère 404 et transmettre au gestionnaire d'erreurs
app.use((req, res, next) => {
  next(createError(404));
});

// Détecter les erreurs non autorisées
app.use((err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: `${err.name}: ${err.message}` });
  }
});

// gestionnaire d'erreurs
app.use((err, req, res, next) => {
  // récupere les erreur de l'environement utilisé, ne fournissant qu'une erreur de développement
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // rendre la page d'erreur
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
