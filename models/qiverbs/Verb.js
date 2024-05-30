const Bdd = require('../Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Verb {


    static async getVerbs(id_class) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM verbs`;

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


    static async getVerbById(id_verb){
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM verbs WHERE id_verb = ? `;
        const value = [id_verb];

        // Exécution de la requête avec les valeurs préparées
        connection.query(query,value,(err, results) => {
          if (err) {
            reject(err);
          } else {
            results = JSON.parse(JSON.stringify(results))
            console.log(results[0])
            resolve(results[0]);
          }
        });
      });      
    }



    static async createVerb(verb) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête d'insertion
        const query = `INSERT INTO verbs (verb) VALUES (?)`;
        const values = [verb];

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

  static async deleteVerb(id_verb) {
    return new Promise((resolve, reject) => {
      // Préparation de la requête de suppression
      const query = `DELETE FROM verbs WHERE id_verb = ?`;
      const values = [id_verb];

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

module.exports = Verb;