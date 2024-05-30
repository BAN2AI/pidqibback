const Bdd = require('../Bdd');
// Création d'une instance de la classe Bdd
const bdd = new Bdd();
// Récupération de l'objet connection
const connection = bdd.getConnection();


class Conjugaison {


  static async numericValue(conjugaison) {
        
        // Définir un objet des valeurs numériques de l'alphabet
        const valeursLettres = {
          'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8,
          'i': 9, 'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15,
          'p': 16, 'q': 17, 'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22,
          'w': 23, 'x': 24, 'y': 25, 'z': 26
        };

        // Retirer le pronom personnel et le verbe auxiliaire
        conjugaison = conjugaison.trim().toLowerCase();
        const pronounsAndAuxiliaries = ['je ', 'tu ', 'il ', 'elle ', 'on ', 'nous ', 'vous ', 'ils ', 'elles ', "j'", "t'", "il'", "elle'", "on'", "nous'", "vous'", "ils'", "elles'", "j'ai ", "tu as ", "il a ", "elle a ", "on a ", "nous avons ", "vous avez ", "ils ont ", "elles ont "];
        for (const pronounOrAuxiliary of pronounsAndAuxiliaries) {
          if (conjugaison.startsWith(pronounOrAuxiliary)) {
            conjugaison = conjugaison.slice(pronounOrAuxiliary.length);
            break;
          }
        }

        // Calculer la valeur numérique du verbe conjugué
        console.log("VERBE CONJUGUE "+conjugaison)
        let valeurNumerique = 0;
        for (const lettre of conjugaison) {
          const lettreMinuscule = lettre.toLowerCase();
          if (lettreMinuscule in valeursLettres) {
            valeurNumerique += valeursLettres[lettreMinuscule];
          }
        }

        return valeurNumerique;
  }

    static async getConjugaison() {
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `
       SELECT verbs.verb, times.time_name, persons.person, conjugaisons.conjugated,conjugaisons.numeric_value
FROM conjugaisons
JOIN times ON times.id_time = conjugaisons.id_time
JOIN persons ON persons.id_person = conjugaisons.id_person 
JOIN verbs ON verbs.id_verb = conjugaisons.id_verb
GROUP BY verbs.id_verb, persons.person, times.id_time
ORDER BY verbs.id_verb, persons.id_person;`;


 
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




     static async isConjugaisonExist(id_time, id_verb, id_person) {
        // Préparation de la requête
        const query = `SELECT * FROM conjugaisons WHERE id_time = ? AND id_verb = ? AND id_person = ?`;
        const value = [id_time, id_verb, id_person];

        // Exécution de la requête avec les valeurs préparées
        try {
          const results = await new Promise((resolve, reject) => {
            connection.query(query, value, (err, results) => {
              if (err) {
                reject(err);
              } else {
                resolve(JSON.parse(JSON.stringify(results)));
              }
            });
          });

          // Vérifier si au moins une ligne a été trouvée
          return results.length > 0;
        } catch (err) {
          console.error(err);
          return false;
        }
      }

    static async updateConjugaison(id_time, id_verb, id_person,conjugated){
       const numeric_value = await this.numericValue(conjugated)
       console.log("Reeeegardons "+typeof(numeric_value))

        const query = `UPDATE conjugaisons SET conjugated = ?, numeric_value = ?
        WHERE id_time = ? AND id_verb = ? AND id_person = ?`;
        const value = [conjugated,numeric_value,id_time, id_verb, id_person];
        // Exécution de la requête avec les valeurs préparées
        try {
          const results = await new Promise((resolve, reject) => {
            connection.query(query, value, (err, results) => {
              if (err) {
                reject(err);
              } else {
                resolve(true);
              }
            });
          });
        } catch (err) {
          console.error(err);
          return false;
        }
      
    }


    static async getConjugaisonForVerb(id_verb){
      return new Promise((resolve, reject) => {
        // Préparation de la requête
        const query = `
    SELECT verbs.verb, times.time_name, persons.person, conjugaisons.conjugated
    FROM conjugaisons
    JOIN times ON times.id_time = conjugaisons.id_time
    JOIN persons ON persons.id_person = conjugaisons.id_person
    JOIN verbs ON verbs.id_verb = conjugaisons.id_verb
    WHERE verbs.id_verb = ?
    GROUP BY verbs.id_verb, persons.person, times.id_time
    ORDER BY verbs.id_verb, persons.id_person
        `;
        const value = [id_verb]

 
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



    static async createConjugaison(id_time,id_verb,id_person,conjugated){
        const numeric_value = await this.numericValue(conjugated)
        return new Promise((resolve, reject) => {

        
        // Préparation de la requête d'insertion
        const query = `INSERT INTO conjugaisons(id_time,id_verb,id_person,conjugated,numeric_value) VALUES (?,?,?,?,?);`;
        const values = [id_time,id_verb,id_person,conjugated,numeric_value];

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

module.exports = Conjugaison;