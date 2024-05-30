const axios = require('axios');
const Partner = require('../models/Partner.js');
const Notification = require('../models/Notification.js');
const Admin = require('../models/Admin.js');
require('dotenv').config();


const express = require('express');
const app = express();
const session = require('express-session');
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));


const baseUrl = process.env.URL_LOCAL_API_CALL

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.loginAdmin = async (req,res) => {
	const {email,password} = req.body
	console.log("loft"+email)
	const admin = await Admin.connection(email,password)
	console.log(admin)
	if (admin === 0) {
  	console.log("Le tableau est vide");	
	}
	else{
		  req.session.admin_name = admin.name
		  req.session.admin_email = admin.email
   }
  console.log("Mboté"+req.session.admin_email)
  res.redirect('/verbs')
}

exports.disconnect = async (req,res)=> {
	res.redirect("/admin")
}



exports.goToAdminLogin = async (req,res) => {
	res.render('login.ejs')
}

exports.goToTimeManager = async (req, res) => {
	//Recuperations des informations a envoyer dans le rendu
	const times = await fetchData(baseUrl+'/api/get_times');
	//Rendu de la page
	res.render('times.ejs',{times})
}

exports.goToClassManager = async (req, res) => {
	//Recuperations des informations a envoyer dans le rendu
	const classes = await fetchData(baseUrl+'/api/get_classes');
	//Rendu de la vue
	res.render('classes.ejs',{classes})
}


exports.goToManageVerbs = async (req, res) => {
	const verbs = await fetchData(baseUrl+'/api/get_verbs');
	//Rendu de la page
	res.render('verbs.ejs',{verbs})

}


exports.goToManagePartner = async (req,res) => {
  const partners = await fetchData(baseUrl+'/api/get_partners')
	res.render('partners.ejs',{partners})
}

exports.goToManageNotification = async (req,res) => {
	const notifications = await fetchData(baseUrl+'/api/get_notifications')
	res.render('notifications.ejs',{notifications})
}


exports.goToPlayersQuestion = async (req, res) => {
	const id_player = req.params.id_player
	const questions_by_player = await fetchData(baseUrl+'/api/get_questions_by_player/'+id_player);
	//Rendu de la page
	res.render('questions_by_player.ejs',{questions_by_player,id_player})
}


exports.goToManageConjugaison = async (req, res) => {

	const times = await fetchData(baseUrl+'/api/get_times');
	const verbs = await fetchData(baseUrl+'/api/get_verbs');

	//Rendu de la page
	res.render('manage_conjugaison.ejs',{verbs})
}

exports.goToManageConjugaisonForVerb = async (req,res) => {
    const id_verb = req.params.id_verb;
    const conjugaison_for_verb = await fetchData(baseUrl+'/api/get_conjugaison_by_verb/'+id_verb);	
    const verb = await fetchData(baseUrl+'/api/get_verb_by_id/'+id_verb);	
		const times = await fetchData(baseUrl+'/api/get_times');	
		const persons = await fetchData(baseUrl+'/api/get_persons');
		console.log(verb.id_verb)
		res.render('manage_conjugaison_for_verb.ejs',{persons,times,verb,conjugaison_for_verb,id_verb})
}

exports.goToPlayerManager = async (req,res) => {
	const players = await fetchData(baseUrl+'/api/get_players');	
	res.render('players_manager.ejs',{players})
}

exports.goToQuestionsManager = async (req, res) => {

	//Recuperations des informations a envoyer dans le rendu

	//Rendu de la page
	res.render('views/questions.ejs')
}


exports.getPartners = async (req, res) => {
  const response = await Partner.getPartners()
  res.json(response);
}

exports.deletePartner = async(req,res) => {
	const id_partner = req.params.id_partner
	response = Partner.deletePartner(id_partner)
	res.redirect("/manage_partners")
}

exports.deleteNotification = async(req,res) => {
	const id_notification = req.params.id_notification
	response = Notification.deleteNotification(id_notification)
	res.redirect("/manage_notifications")
}