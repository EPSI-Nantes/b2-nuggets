var reqmysql = require('./ressource/connection');
var express = require('express');
var session = require('cookie-session');
var ping = require('ping');
var bodyParser = require('body-parser');
var http = require('http');
var net = require('net');
var fs = require('fs');
var tcpp = require('tcp-ping');
var app = express();
var server = http.createServer(app);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var sess;
var io = require('socket.io');
io = io.listen(server);
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
res.redirect('/board');
});

app.post('/deletservice', function(req, res) {
  var serviceadelet = req.body.serviceadelet;
  reqmysql.deletservice(serviceadelet);
res.redirect('/board');
});












app.get('/board', function(req, res) {
  var statuhardware;
reqmysql.lshardware(function callback (result){
  var hardware = result;
reqmysql.lsservice(function callback (result2){
  var service = result2;
  var servi = [];

  var servicestatus = [];
  service.forEach(function(row) {
  var temp = [];
  temp.push(row.ip);
  temp.push(row.port);
  servi.push(temp);
  })
var servicecount = servi.length;
console.log(servicecount);
servi.forEach(function(item) {
pingservice(item, function callback (result3){
  console.log(result3);
servicestatus.push(result3);
var longueur=servicestatus.length;
if (longueur == servicecount) {
  console.log(servicestatus);
  res.render('board.ejs', {hardware: hardware, service: service, servicestatus: servicestatus});
};
  });
});
});
});
});




function pingservice (item, callback){
    var sock = new net.Socket();
    sock.setTimeout(2500);
    sock.on('connect', function() {
    callback(item[0]+':'+item[1]+' is alive');
        sock.destroy();
    }).on('error', function(e) {
    callback(item[0]+':'+item[1]+' is dead: ' + e.message);
    }).on('timeout', function(e) {
    callback(item[0]+':'+item[1]+' is dead: timeout');
    }).connect(item[1], item[0]);
};
exports.pingservice = pingservice;







app.post('/ajouterservice', function(req, res) {
  var namese = req.body.namese;
  var ipse = req.body.ipse;
  var portse = req.body.portse;
  reqmysql.ajouterservice(namese, ipse, portse);
res.redirect('/board');
});

app.post('/ajouterhardware', function(req, res) {
  var nameeq = req.body.nameeq;
  var ip = req.body.ip;
  reqmysql.ajouterhardware(nameeq, ip);
res.redirect('/board');
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