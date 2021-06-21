const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        // Retour si utilisateur introuvable dans la base de données
        if (!user) {
          return done(null, false, {
            message: 'Utilisateur non trouvé'
          });
        }
        // Retour si le mot de passe est erroné
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Le mot de passe est erroné'
          });
        }
        // Si les informations d'identification sont correctes, retournez l'objet utilisateur
        return done(null, user);
      });
    }
  )
);
