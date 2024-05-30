const Player = require('../models/qifoot/Player.js');
const Question = require('../models/qifoot/Question.js');


//GET


exports.getPlayers = async (req, res) => {
  playerList = await Player.getPlayers();
  res.json(playerList);
}

exports.getQifootQuestions = async (req, res) => {
  const questions = await Question.getQifootQuestions()
  res.json(questions);
}

exports.getQuestionsByPlayer = async (req, res) => {
  const id_player = req.params.id_player;
  const questions = await Question.getQuestionsByPlayer(id_player)
  res.json(questions);
}

//POST

exports.postPlayer = async (req, res) => {
  const { player_name} = req.body;
  const response = await Player.createPlayer(player_name)

  if(req.params.target == "mobile")
  {
    res.json(response);
  }
  if(req.params.target == "web"){
    res.redirect('/players_manager')
  }
}

exports.postQiFootQuestion = async (req, res) => {
  const { id_player,question_content,answer} = req.body;

  const response = await Question.createQuestion(id_player,question_content,answer)

  if(req.params.target == "mobile")
  {
    res.json(response);
  }
  if(req.params.target == "web"){
    res.redirect('/manage_players_question/'+id_player)
  }
}

exports.deletePlayer = async (req,res) => {
  const id_player = req.params.id_player;
  const response = await Player.deletePlayer(id_player)
  res.redirect('/players_manager')
}

exports.deleteQiFootQuestion = async (req,res) => {
  const id_qifoot_question = req.params.id_qifoot_question;
  const id_player = req.params.id_player;
  const response = await Question.deleteQiFootQuestion(id_qifoot_question)
  res.redirect("/manage_players_question/"+id_player)  
}

