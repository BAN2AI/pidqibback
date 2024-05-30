const Bdd = require('../Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Pool {


    static async getPools() {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM pools`;

        // Exécution de la requête avec les valeurs préparées
        connection.query(query,(err, results) => {
          if (err) {
            reject(err);
          } else {
            results = JSON.parse(JSON.stringify(results))
            //console.log(results)
            resolve(results);
          }
        });
      });
    }

  
    static async createPool(pool_name) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête d'insertion
        const query = `INSERT INTO pools(pool_name) VALUES (?)`;
        const values = [pool_ame];

        // Exécution de la requête avec les valeurs préparées
        connection.query(query, values, (err, result) => {
          if (err) {
            reject(err);
          } else {
            // La requête a réussi, on retourne true
            resolve(true);
          }
        });
      });
    }


}

module.exports = Pool;