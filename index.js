const express = require("express");
const app = express();
const path = require("path");
const con = require("./connection");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "statics")));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const title = "Music";
  // res.render("home", { title: title });
  res.redirect("/songs/");
});

app.get("/songs", async (req, res) => {
  const title = "Songs";
  var start = req.query.start || 0;
  var len = req.query.len || 20;
  if (start < 0) {
    start = 0;
  }
  if (len < 0) {
    len = 20;
  }
  var info = {
    start: start,
    len: len,
  };
  console.log(info);
  con.query(
    `SELECT s.Name as Song_Name, s.Song_ID, a.Image_Url, s.Preview_Url, a.Name as Album_Name, a.Album_ID, ar.Name as Artist_Name, ar.Artist_ID FROM songs as s INNER JOIN albums as a ON s.Album_ID = a.Album_ID INNER JOIN artists as ar ON s.Artist_ID = ar.Artist_ID ORDER BY RAND() LIMIT ${start}, ${len};`,
    function (err, result, fields) {
      if (err) throw err;
      res.render("songs", { title: title, result: result, info: info });
    }
  );
});

app.get("/songs/:id", async (req, res) => {
  const songID = req.params.id;
  con.query(
    `SELECT *, s.Name as Song_Name, a.Image_Url, s.Preview_Url, s.Spotify_Url, s.Duration, a.Release_Date, a.Name as Album_Name, ar.Name as Artist_Name FROM songs as s INNER JOIN albums as a ON s.Album_ID = a.Album_ID INNER JOIN artists as ar ON s.Artist_ID = ar.Artist_ID WHERE s.Song_ID = '${songID}';`,
    function (err, result, fields) {
      if (err) throw err;
      title = result[0].Song_Name;
      console.log(result);
      res.render("song", { title: title, song: result });
    }
  );
});

app.get("/artists", (req, res) => {
  const title = "All Artists";
  con.query("SELECT * FROM artists;", function (err, result, fields) {
    if (err) throw err;
    console.log(result[0]);
    res.render("artists", { title: title, result: result });
  });
});

app.get("/artists/:id", (req, res) => {
  const artistID = req.params.id;
  con.query(
    `SELECT *, ar.Name as Artist_Name, ar.Spotify_Url as Artist_Url FROM artists as ar INNER JOIN albums as al ON ar.Artist_ID = al.Artist_ID WHERE ar.Artist_ID = '${artistID}' AND al.Total_Tracks>1;`,
    function (err, result, fields) {
      if (err) throw err;
      title = result[0].Artist_Name;
      // console.log(result);
      artistdetails = result;
      console.log(artistdetails);
      res.render("artist", { title: title, artistdetails: artistdetails });
    }
  );
});

app.get("/albums", async (req, res) => {
  const title = "Albums";
  var start = req.query.start || 0;
  var len = req.query.len || 20;
  if (start < 0) {
    start = 0;
  }
  if (len < 0) {
    len = 20;
  }
  var info = {
    start: start,
    len: len,
  };
  console.log(info);
  con.query(
    `SELECT *, al.Name as Album_Name, al.Image_Url, ar.Name as Artist_Name, al.Album_ID FROM albums as al INNER JOIN artists as ar ON al.Artist_ID = ar.Artist_ID WHERE al.Total_Tracks > 1 ORDER BY RAND() LIMIT ${start}, ${len};`,
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.render("albums", { title: title, result: result, info: info });
    }
  );
});

app.get("/albums/:id", async (req, res) => {
  const Album_ID = req.params.id;
  con.query(
    `SELECT *, al.Name as Album_Name, al.Image_Url, ar.Name as Artist_Name, al.Album_ID FROM albums as al INNER JOIN artists as ar ON al.Artist_ID = ar.Artist_ID INNER JOIN songs as s ON s.Album_ID = al.Album_ID WHERE al.Album_ID = '${Album_ID}';`,
    function (err, result, fields) {
      if (err) throw err;
      title = result[0].Song_Name;
      console.log(result);
      res.render("album", { title: title, result: result });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", { title: "404" });
});
