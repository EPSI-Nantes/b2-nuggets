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

//ouverture de la page plan
app.get('/plan', function(req, res) {
var msg ='';
res.render('plan.ejs', {msg: msg});
});

//enregistrement des positions(copié à modifier!!!!!!!!!!!)
app.post('/enregistrementElements', function(req, res) {
//var id = req.body.element0.id;
//var x = req.body.element0.left;
//var y = req.body.element0.right;
reqmysql.enregistrementElements(id, x, y, function callback (result){
});
res.redirect('/plan');
});

//test
app.post('/enregistrerElement',function(req, res) {
var msg = x;
res.redirect('/plan');
});

//aller à la page adminappli
app.get('/adminapplication', function(req, res) {
var user;
reqmysql.afficheruser(function callback (result){
user = result;
res.render('adminappli.ejs', {msg: user});
});
});

app.post('/deletuser', function(req, res) {
var useradelet = req.body.useradelet;
reqmysql.deletuser(useradelet, function callback (result){
});
res.redirect('/adminapplication');
});

app.post('/ajouteruser', function(req, res) {
var loginajouter = req.body.loginajouter;
var passwordajouter = req.body.passwordajouter;
var access = req.body.access;
reqmysql.ajoutuser(loginajouter, passwordajouter, access, function callback (result){
});
res.redirect('/adminapplication');
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

.use(express.static(__dirname + '/css'));
server.listen(8000);