const Bdd = require('./Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Partie {


    static async getScoreForUser(id_user,id_game) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM parties WHERE id_user = ? AND id_game = ?`;
        const value = [id_user,id_game]
        // Exécution de la requête avec les valeurs préparées
        connection.query(query,value,(err, results) => {
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
                         
    static async createScore(id_game,id_user,question,answer,score){
      return new Promise((resolve, reject) => {
        // Préparation de la requête d'insertion
        const query = `INSERT INTO parties(id_game,id_user,question,answer,score) VALUES (?,?,?,?,?)`;
        const values = [id_game,id_user,question,answer,score];

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

module.exports = Partie;