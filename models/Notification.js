const Bdd = require('./Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Notification {


    static async getNotifications() {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM notifications`;
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

    static async createNotification(content_news,img){
        return new Promise((resolve, reject) => {
        // Préparation de la requête d'insertion
        const query = `INSERT INTO notifications(content,img,created_at) VALUES (?, ?, NOW());`;
        const values = [content_news,img];

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

  static async deleteNotification(id_notification) {
    return new Promise((resolve, reject) => {
      // Préparation de la requête de suppression
      const query = `DELETE FROM notifications WHERE id_notification = ?`;
      const values = [id_notification];

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

module.exports = Notification;