const Person = require('../models/qiverbs/Person.js');
const Question = require('../models/qiverbs/Question.js');
const Time = require('../models/qiverbs/Time.js');
const Verb = require('../models/qiverbs/Verb.js');
const Conjugaison = require('../models/qiverbs/Conjugaison.js');
const Partie = require('../models/Partie.js');


//GET


exports.getVerbs = async (req, res) => {
  const verbList = await Verb.getVerbs();
  console.log(verbList)
  res.json(verbList);
}

exports.getVerbById = async (req,res) => {
  const id_verb = req.params.id_verb;
  const verb = await Verb.getVerbById(id_verb);
  console.log(verb)
  res.json(verb);  
}

exports.getTimes = async (req, res) => {
  //const id_verb = req.params.id_verb;
  const timeList = await Time.getTimes();
  console.log(timeList)
  res.json(timeList);
}

exports.getPersons = async (req, res) => {
  //const id_time = req.params.id_time;
  const personList = await Person.getPersons();
  console.log(personList)
  res.json(personList);
}

exports.getQuestions = async (req, res) => {

  const rawData = await Conjugaison.getConjugaison();
  console.log(rawData)
  function generateQuestionsAndAnswers(rawData) {
    const questionsAndAnswers = [];
    const personneGrammaticale = {
    "1er p": "Première personne du singulier",
    "2e p": "Deuxième personne du singulier", 
    "3e p": "Troisième personne du singulier",
    "4e p": "Première personne du pluriel",
    "5e p": "Deuxième personne du pluriel",
    "6e p": "Troisième personne du pluriel"
  };

    for (const item of rawData) {
      const { verb, time_name, person, conjugated } = item;

      const question1 = `Donner la valeur la conjugaison de verbe ${verb} conjugué au temps ${time_name} à la ${personneGrammaticale[person]}`;
      const question2 = "Quel est la valeur numerique de cette conjugaison";
      const answer1 = conjugated;
      const answer2 = item.numeric_value;
      const score1 = 5;
      const score2 = 5;

      questionsAndAnswers.push({
        question1,
        question2,
        answer1,
        answer2,
        score1,
        score2,
        verb,
        time: time_name,
        person,
      });
    }

    return questionsAndAnswers;
  }

  questions = generateQuestionsAndAnswers(rawData)
  //const questions = await Question.getQuestions();
  //console.log(questions)
  res.json(questions); 
}

//POST




exports.createVerb = async (req, res) => {
  const {verb} = req.body;
  const response = await Verb.createVerb(verb)

  if(req.params.target == "mobile")
  {
    res.json(response);
  }
  if(req.params.target == "web"){
    res.redirect('/verbs')
  }
}


exports.createTime = async (req, res) => {
  const time_name = req.body.time_name
  const response = await Time.createTime(time_name)

  if(req.params.target == "mobile")
  {
    res.json(response);
  }
  if(req.params.target == "web"){
    res.redirect('/times')
  }
}


exports.getConjugaison = async (req,res) => {
  
  response = await Conjugaison.getConjugaison();

  function formatConjugations(data) {
      const result = {};

      for (const entry of data) {
        const { verb, time_name, person, conjugated } = entry;

        if (!result[verb]) {
          result[verb] = {};
        }

        if (!result[verb][time_name]) {
          result[verb][time_name] = {};
        }

        result[verb][time_name][person] = conjugated;
      }

      return result;
    }
  console.log(formatConjugations(response))
  res.json(formatConjugations(response));  
}

exports.getConjugaisonForVerb = async (req,res) => {
  const id_verb = req.params.id_verb
  response = await Conjugaison.getConjugaisonForVerb(id_verb);

    function formatConjugations(data) {
      const result = {};

      for (const entry of data) {
        const { verb, time_name, person, conjugated } = entry;

        if (!result[verb]) {
          result[verb] = {};
        }

        if (!result[verb][time_name]) {
          result[verb][time_name] = {};
        }

        result[verb][time_name][person] = conjugated;
      }

      return result;
    }

  console.log("ggg"+formatConjugations(response))
  res.json(formatConjugations(response));  
}




exports.createQuestion = async (req, res) => {
  const {id_time,id_verb,id_person,question1,answer1,question2,answer2,oint_question1,point_question2} = req.body 
  const response = await Question.createQuestion(id_time,id_verb,id_person,question1,answer1,question2,answer2,oint_question1,point_question2)
  res.json(response);
}

exports.postQiverbsScore = async (req,res) => {
  const {id_user,question,answer,score,id_game} = req.body
  const response = await Partie.createScore(id_game,id_user,question,answer,score)
  res.json(response);

}


exports.getScoreForUser = async (req,res) => {
  const id_user =  req.params.id_user
  const id_game =  req.params.id_game
  const response = await Partie.getScoreForUser(id_user,id_game)
  res.json(response);
}

exports.postConjugaison = async(req,res) => {
  const { id_time,id_verb,id_person,conjugated } = req.body
  var response;

  const isConjugaisonExist = await Conjugaison.isConjugaisonExist(id_time,id_verb,id_person)
  console.log("mmmmmm"+isConjugaisonExist)

  if(isConjugaisonExist)
  {
     response = await Conjugaison.updateConjugaison(id_time,id_verb, id_person,conjugated)
  }else
  {
     response = await Conjugaison.createConjugaison(id_time,id_verb,id_person,conjugated)
  }
  

  if(req.params.target == "mobile")
  {
    res.json(response);
  }
  if(req.params.target == "web"){
    res.redirect('/manage_conjugaison_for_verb/'+id_verb)
  }

}

exports.deleteVerb = async (req,res) =>{
  const id_verb = req.params.id_verb
  response = await Verb.deleteVerb(id_verb)
  if(response)
  {
    res.redirect('/verbs')
  }
}

exports.deleteTime = async (req,res) =>{
  const id_time = req.params.id_time
  response = await Time.deleteTime(id_time)
  if(response)
  {
    res.redirect('/times')
  }  
}


