const Bdd = require('../Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Player {


    static async getPlayers() {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM players`;

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

    static async createPlayer(player_name) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête d'insertion
        const query = `INSERT INTO players(player_name) VALUES (?)`;
        const values = [player_name];

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

  static async deletePlayer(id_player) {
    return new Promise((resolve, reject) => {
      // Préparation de la requête de suppression
      const query = `DELETE FROM players WHERE id_player = ?`;
      const values = [id_player];

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

module.exports = Player;