var express = require("express");
var fs = require("fs");

var PORT = 3000;

var app = express();

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.get("/", ( req, res)=>{
  res.write(fs.readFileSync("index.html", 'utf-8'));
  res.send();
});

app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})
