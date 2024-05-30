const Bdd = require('./Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Level {


    static async getLevels() {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM levels`;
        // Exécution de la requête avec les valeurs préparées
        connection.query(query,(err, results) => {
          if (err) {
            reject(err);
          } else {
            results = JSON.parse(JSON.stringify(results))
            console.log(results)
            resolve(results);
          }
        });
      });
    }
      

}

module.exports = Level;