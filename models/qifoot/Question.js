const Bdd = require('../Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Question {


    static async getQifootQuestions() {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM qifoot_questions`;

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


    static async getQuestionsByPlayer(id_player){
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM qifoot_questions WHERE id_player = ?`;
        const value = [id_player]

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



    static async createQuestion(id_player,question_content,answer) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête d'insertion
        const query = `INSERT INTO qifoot_questions(id_player,question_content,answer) VALUES (?,?,?)`;
        const values = [id_player,question_content,answer];

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


    static async deleteQiFootQuestion(id_qifoot_question) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête de suppression
        const query = `DELETE FROM qifoot_questions WHERE id_question = ?`;
        const values = [id_qifoot_question];

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

module.exports = Question;