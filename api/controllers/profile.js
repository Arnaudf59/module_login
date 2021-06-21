const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.profileRead = (req, res) => {
  // Si aucun ID utilisateur n'existe dans le JWT, retournez un 401
  if (!req.payload._id) {
    res.status(401).json({
      message: 'Erreur non autorisée: profil privé'
    });
  } else {
    // Sinon on continue
    User.findById(req.payload._id).exec(function(err, user) {
      res.status(200).json(user);
    });
  }
};
