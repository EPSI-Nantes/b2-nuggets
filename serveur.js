var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(session({secret: 'todotopsecret'}))


/* La page de connection */
.get('/', function(req, res) { 
    res.render('index.ejs');
})

/* On ajoute un élément à la todolist */
.post('/connexion/', urlencodedParser, function(req, res) {
		console.log(identifiant);
    res.redirect('/');
})
.use(express.static(__dirname + '/css'))
.listen(8080);