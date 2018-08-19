const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+ "/views/partials");
app.set('view engine', 'hbs');


app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = now + " " + req.method + " " + req.url;
  fs.appendFileSync('server.log', log + '\n');
  next();
});

app.use(function(req, res, next){
  res.render('underconstruction.hbs');
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('currentYear', function(){
   return new Date().getFullYear()

});

hbs.registerHelper("screamIt", function(text){

  return text.toUpperCase();
});

app.get("/", function(req, res){
  res.render("home.hbs",
  {welcometext : "Here is the home page",
  pageTitle: "Home Page"
});
});


app.get("/about", function(req, res){
  res.render('about.hbs',{
    pageTitle: "About Page"
  });
});


app.get("/bad", function(req, res){
  res.send({data:"error", errormessage:"this is a error message!"});
});


app.listen(port, function(){
  console.log("Server is running at "+ port);
});
