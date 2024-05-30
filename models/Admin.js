const Bdd = require('./Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Admin {

    constructor(id, name, email, password) {
    this.id = id;
    this.name =  name;
    this.email = email;
    this.password = password;
    }


    static async connection(email, password) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM admins WHERE email = ? AND password = ?`;
        const values = [email, password];

        // Exécution de la requête avec les valeurs préparées

        connection.query(query, values, (err, results) => {
          if (err) {
            reject(err);
          } else {
            results = JSON.parse(JSON.stringify(results))
            resolve(results);
          }
        });
      });
    }

  

}

module.exports = Admin;