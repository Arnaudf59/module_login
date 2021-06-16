const mongoose = require ('mongoose');
const User = mongoose.model ('Utilisateur');

module.exports.profileRead = (req, res) => {
  // Si aucun ID utilisateur n'existe dans le JWT, renvoyer un 401
  if(! req.payload._id){
    res.status (401) .json ({
      message: 'UnauthorizedError: profil privé'
    });
  }else{
    // Sinon, continuez
    User.findById(req.payload._id).exec(function(err, user) {
        res.status(200).json(user);
    });
  }
};