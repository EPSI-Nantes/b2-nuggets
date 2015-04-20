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
var lsavions;
var lsproduit = '';
var lsaeroports;
app.use(session({secret: 'todotopsecret'}));
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());



app.get('/', function(req, res) {
var msg ='';
res.render('index.ejs', {msg: msg});
});

app.post('/delethardware', function(req, res) {
  var hardwareadelet = req.body.hardwareadelet;
  reqmysql.delethardware(hardwareadelet);
res.redirect('/hardware');
});

app.get('/hardware', function(req, res) {
reqmysql.lshardware(function callback (result){
var hardware = result;
res.render('hardware.ejs', {msg: hardware});
});
});

app.post('/ajouterhardware', function(req, res) {
  var nameeq = req.body.nameeq;
  var ip = req.body.ip;
  reqmysql.ajouterhardware(nameeq, ip);
res.redirect('/hardware');
});

app.post('/connexion', function(req, res) {
  var login = req.body.login;
  var password = req.body.password;
  reqmysql.login(login, password, function callback (result){
if (result == "admin" || result == "user") {
    sess = req.session;
    sess.access = result.access;
    res.render('admin.ejs', {access: sess.access});
}
else {
  res.render('index.ejs', {msg: result});
}
});
});

app.get('/admin', function(req, res) {
  var msg ='';
res.render('admin.ejs', {msg: msg});
});

app.get('/adminapplication', function(req, res) {
  var user;
reqmysql.afficheruser(function callback (result){
  user = result;
res.render('adminappli.ejs', {msg: user});
});
});

app.post('/deletuser', function(req, res) {
  var useradelet = req.body.useradelet;
  reqmysql.deletuser(useradelet);
res.redirect('/adminapplication');
});

app.post('/ajouteruser', function(req, res) {
  var loginajouter = req.body.loginajouter;
  var passwordajouter = req.body.passwordajouter;
  var access = req.body.access;
  reqmysql.ajoutuser(loginajouter, passwordajouter, access, function callback (result){
  });
res.redirect('/adminapplication');
})
.use(express.static(__dirname + '/css'));
server.listen(8080);