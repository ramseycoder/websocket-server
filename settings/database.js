const mongoose = require('mongoose');
const config = require('./config.json');// on recupére la configuration des paramètre de connexion à la base de donnée
/* remarque: ces paramètres sont configuré pour un site en local,
 si le site est en ligne, il faudrat modifier le paramètre mongoUrl du fichier settings.json  en remplacant '127.0.0.1:27017' par
 l'adresse du serveur, aussi défini user
 */
const connection = async () => {
    try{
        await mongoose.connect(config.mongoUrl+'/'+config.dbname,{
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            // deux autre paramètres user et pass sont à ajouté  s'il faut un compte pour accéder à mongodb, paramètre modifiable dans settings.json
        });
        console.log('connected to mongodb');
    }catch(e){
        console.log('erreur',e);
    }

};

module.exports = connection;
