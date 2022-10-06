console.log("App.js Connected!");
// const express = require("express");
const mysql = require("mysql2");

require("dotenv").config();
// console.log(process.env["AWSHOST"]);
var con = mysql.createConnection({
  host: `${process.env["AWSHOST"]}`,
  user: `${process.env["AWSUSERNAME"]}`,
  password: `${process.env["AWSPASSWORD"]}`,
  database: "music",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to Database!");
});

module.exports = con;
