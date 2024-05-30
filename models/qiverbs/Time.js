const Bdd = require('../Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Time {


    static async getTimes() {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM times`;

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

    static async createTime(time_name) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête d'insertion
        const query = `INSERT INTO times (time_name) VALUES (?)`;
        const values = [time_name];

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

  static async deleteTime(id_time) {
    return new Promise((resolve, reject) => {
      // Préparation de la requête de suppression
      const query = `DELETE FROM times WHERE id_time = ?`;
      const values = [id_time];

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

module.exports = Time;