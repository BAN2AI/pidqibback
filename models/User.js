const Bdd = require('./Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class User {


    static async auth(email, password) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
        const values = [email, password];

        // Exécution de la requête avec les valeurs préparées
        connection.query(query, values, (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results.length === 0) {
              resolve(false); // Renvoie false si aucun résultat
            } else {
              results = JSON.parse(JSON.stringify(results));
              resolve(results);
            }
          }
        });
      });
    }


    static async sign(email,name,password,phone,avatar_user,address) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête d'insertion
        const query = `INSERT INTO users (email, name, password, phone, avatar_user, address) VALUES (?, ?, ?, ?, ?, ?);`;
        const values = [email, name, password, phone, avatar_user, address];

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

module.exports = User;