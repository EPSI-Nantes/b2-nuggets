var reqmysql = require('./ressource/connection');
var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var app = express();
var server = http.createServer(app);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var sess;
var io = require('socket.io').listen(server);

app.use(session({secret: 'todotopsecret'}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
var msg ='';
res.render('index.ejs', {msg: msg});
});

app.post('/admin', function(req, res) {
	var login = req.body.login;
	var password = req.body.password;
	reqmysql.selectuser(login, password, function callback (result){
		try{
	if (result.login == login && result.password == password) {
		sess = req.session;
		sess.access = result.access;
    res.render('admin.ejs', {access: sess.access});
  	};
  	if (result.login == login && result.password != password) {
  	var msg = 'Mot de passe incorrect';
    res.render('index.ejs', {msg: msg});
    };
  	}
  	catch(msg){
  	var msg = 'Le login existe pas.';
    	res.render('index.ejs', {msg: msg});
  	}
	});
})


.use(express.static(__dirname + '/css'))
server.listen(8000);