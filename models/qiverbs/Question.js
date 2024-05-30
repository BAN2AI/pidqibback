const Bdd = require('../Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Verb {


    static async getQuestion(id_time,id_person,id_verb) {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT * FROM questions WHERE id_person = ? AND id_time = ?  AND id_verb = ?`;
        var values = [id_person,id_time,id_verb]

        // Exécution de la requête avec les valeurs préparées
        connection.query(query,values,(err, results) => {
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


    static async getQuestions() {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `SELECT questions.question1, questions.question2, 
        questions.answer1, questions.answer2, questions.point_question1, 
        questions.point_question2,verbs.verb,persons.person

        FROM questions,verbs,persons,times

        WHERE 

        questions.id_verb = verbs.id_verb
        AND questions.id_person = persons.id_person
        AND questions.id_time = times.id_time`;

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





    static async createQuestion(id_time,id_verb,id_person,question1,answer1,question2,answer2,oint_question1,point_question2) {
     
      return new Promise((resolve, reject) => {
        // Préparation de la requête d'insertion
        const query = `INSERT INTO questions (id_time,id_verb,id_person,question1,answer1,question2,answer2,point_question1,point_question2) 
        VALUES (?,?,?,?,?,?,?,?,?)`;
        const values = [id_time,id_verb,id_person,question1,answer1,question2,answer2,oint_question1,point_question2];

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