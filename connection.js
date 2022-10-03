console.log("App.js Connected!");
// const express = require("express");
const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "hari31416",
  password: "HariSQL123",
  database: "music",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to Database!");
});

module.exports = con;
