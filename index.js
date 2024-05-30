const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();




const controllerQiVerbs = require('./controllers/controllerQiVerbs.js');
const controllerQiFoot = require('./controllers/controllerQiFoot.js');
const controllerAuth = require('./controllers/controllerAuth.js');
const controllerAdmin = require('./controllers/controllerAdmin.js');


// Middleware pour parser le body JSON
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false}));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'justalambdakey', // Clé secrète pour crypter les données de session
  resave: false, // Sauvegarder la session même si elle n'a pas été modifiée
  saveUninitialized: true, // Ne pas sauvegarder les sessions vides
}));
// Configurer le middleware express-fileupload
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'public')
}));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));


const isAdminAuthenticated = (req, res, next) => {
  // Vérifie si l'admin est connecté
  if (!req.session.admin) {
    res.redirect('/login')
  }
}



app.get('/', (req,res)=>{
  res.send("It works")
})


// Définition des routes pour la partie Qi-Verbs

//GET
//app.get('/api/get_classes',controllerQiVerbs.getClasses)
app.get('/api/get_verbs',controllerQiVerbs.getVerbs)
app.get('/api/get_verb_by_id/:id_verb',controllerQiVerbs.getVerbById);
app.get('/api/get_times',controllerQiVerbs.getTimes)
app.get('/api/get_conjugaison',controllerQiVerbs.getConjugaison)
app.get('/api/get_conjugaison_by_verb/:id_verb',controllerQiVerbs.getConjugaisonForVerb)
app.get('/api/get_persons',controllerQiVerbs.getPersons)
app.get('/api/get_qiverbs_questions',controllerQiVerbs.getQuestions)
//app.get('/api/get_qiverbs_question/:id_person/:id_time/:id_verb',controllerQiVerbs.getQuestions)
//POST
app.post('/api/post_verb/:target',controllerQiVerbs.createVerb) 
app.post('/api/post_time/:target',controllerQiVerbs.createTime) 
app.post('/api/post_qiverbs_question/:target',controllerQiVerbs.createQuestion)
app.post('/api/post_conjugaison/:target',controllerQiVerbs.postConjugaison)

//DELETE
app.get('/api/delete_verb/:id_verb',controllerQiVerbs.deleteVerb)
app.get('/api/delete_time/:id_time',controllerQiVerbs.deleteTime)




// Définition des routes pour la partie Qi-Foot
//GET
app.get('/api/get_players',controllerQiFoot.getPlayers)
app.get('/api/get_qifoot_questions',controllerQiFoot.getQifootQuestions)
app.get('/api/get_questions_by_player/:id_player',controllerQiFoot.getQuestionsByPlayer)
//POST
app.post('/api/post_player/:target',controllerQiFoot.postPlayer)
app.post('/api/post_qifoot_question/:target',controllerQiFoot.postQiFootQuestion)
//DELETE
app.get('/api/delete_player/:id_player',controllerQiFoot.deletePlayer)
app.get('/api/delete_qifoot_question/:id_qifoot_question/:id_player',controllerQiFoot.deleteQiFootQuestion)





//Définitions des routes pour l'authentification et l'inscription / et autres fonctionnalités générales
//GET
app.get('/api/get_score_by_game_and_user/:id_user/:id_game',controllerQiVerbs.getScoreForUser)
app.get('/api/get_notifications',controllerAuth.getNotifications)
app.get('/api/get_levels',controllerAuth.getLevels)
app.get('/api/get_games',controllerAuth.getGames)
app.get('/api/get_partners',controllerAdmin.getPartners)


//POST
app.post('/api/post_notification/:target',controllerAuth.postNotification)
app.post('/api/post_partner/:target',controllerAuth.postPartner)
//DELETE
app.get('/api/delete_notification/:id_notification',controllerAdmin.deleteNotification)
app.get('/api/delete_partner/:id_partner',controllerAdmin.deletePartner)


app.post('/api/post_score',controllerQiVerbs.postQiverbsScore)
app.post('/api/auth',controllerAuth.auth)
app.post('/api/sign',controllerAuth.sign)











//Route pour l'administration
app.get('/admin',controllerAdmin.goToAdminLogin)
app.get('/disconnect',controllerAdmin.disconnect)
app.post('/admin_login',controllerAdmin.loginAdmin)
//QiVerbs
app.get('/times',controllerAdmin.goToTimeManager)
app.get('/verbs',controllerAdmin.goToManageVerbs)
app.get('/questions',controllerAdmin.goToQuestionsManager)
app.get('/conjugaison',controllerAdmin.goToManageConjugaison)
app.get('/manage_conjugaison_for_verb/:id_verb',controllerAdmin.goToManageConjugaisonForVerb)

//QiVebrs
app.get('/players_manager',controllerAdmin.goToPlayerManager)
app.get('/manage_players_question/:id_player',controllerAdmin.goToPlayersQuestion)

//Others
app.get('/manage_partners', controllerAdmin.goToManagePartner)
app.get('/manage_notifications', controllerAdmin.goToManageNotification)




// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});