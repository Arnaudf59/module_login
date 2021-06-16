equire ('./ users');
const mangouste = require ('mangouste');
const dbURI = 'mongodb: // localhost: 27017 / meanAuth';

mongoose.set ('useCreateIndex', true);
mongoose.connect (dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on ('connecté', () => {
  console.log (`Mongoose connecté à $ {dbURI}`);
});
mongoose.connection.on ('error', (err) => {
  console.log (`Erreur de connexion Mongoose: $ {err}`);
});
mongoose.connection.on ('déconnecté', () => {
  console.log ('Mongoose déconnecté');
});