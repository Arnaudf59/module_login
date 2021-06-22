const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

module.exports.register = (req, res) => {
  const user = new User();

  user.name = req.body.name;
  user.prenom = req.body.prenom;
  user.date_naissance = req.body.date_naissance;
  user.admin = "0";
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(() => {
    const token = user.generateJwt();
    res.status(200);
    res.json({
      token: token
    });
  });
};

module.exports.login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    // Si Passport renvoie une erreur
    if (err) {
      res.status(404).json(err);
      return;
    }

    // Si un utilisateur est trouvé
    if (user) {
      const token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      // Si l'utilisateur n'est pas trouvé
      res.status(401).json(info);
    }
  })(req, res);
};
