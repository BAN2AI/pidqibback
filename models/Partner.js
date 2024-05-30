const Bdd = require('./Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Partner {


    static async createPartner(partner_name,partner_avatar){
        return new Promise((resolve, reject) => {
        // Préparation de la requête d'insertion
        const query = `INSERT INTO partners(partner_name,partner_avatar,created_at) VALUES (?, ?, NOW());`;
        const values = [partner_name,partner_avatar];

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



    static async getPartners() {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM partners`;
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


  static async deletePartner(id_partner) {
    return new Promise((resolve, reject) => {
      // Préparation de la requête de suppression
      const query = `DELETE FROM partners WHERE id_partner = ?`;
      const values = [id_partner];

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

module.exports = Partner;