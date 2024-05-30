const mysql = require('mysql');
require('dotenv').config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

class Bdd {
  constructor() {
    this.connection = connection;
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = Bdd;