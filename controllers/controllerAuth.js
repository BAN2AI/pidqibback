const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const User = require('../models/User.js');
const Notification = require('../models/Notification.js');
const Level = require('../models/Level.js');
const Game = require('../models/Game.js');
const Partner = require('../models/Partner.js');


exports.auth = async (req, res) => {
   const { email, password } = req.body;
  response = await User.auth(email,password);
  res.json(response);
}

exports.sign = async (req, res) => {
  const { email,name,password,phone,avatar_user,address} = req.body;

  response = await User.sign(email,name,password,phone,avatar_user,address);
  res.json(response);
}

exports.getNotifications = async (req, res) => {
  response = await Notification.getNotifications();
  res.json(response);
}


exports.getLevels = async (req,res) => {
  response = await Level.getLevels();
  res.json(response);  
}

exports.getGames = async (req,res) => {
  response = await Game.getGames();
  res.json(response);  
}


exports.postNotification = async (req,res) => {
  const {content} = req.body
  const img = 'link';
  const response = await Notification.createNotification(content,img)

  if(req.params.target == "mobile")
  {
    res.json(response);
  }
  if(req.params.target == "web"){
    res.redirect('/manage_notifications')
  }
}

exports.postPartner = async (req,res) => {

  const {partner_name} = req.body
  const partner_avatar = 'link';
  const response = await Partner.createPartner(partner_name,partner_avatar)

  if(req.params.target == "mobile")
  {
    res.json(response);
  }
  if(req.params.target == "web"){
    res.redirect('/manage_partners')
  }
}

exports.getGames = async (req,res) => {

  const games = await Game.getGames()
  res.json(games);
  
}



 