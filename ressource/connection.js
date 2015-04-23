var mysql = require('mysql');
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'nuggets',
    }
);

var login = function (login, password, callback){
connection.query('SELECT id, access from user WHERE login = ? AND password = ?',[ login , password],  function(err, rows, fields) {
try{
  if (rows[0].access == "admin" || rows[0].access == "user") {
    var msg = rows[0].access;
    callback(msg);
};
}
catch(err){
    var msg = 'Le login ou mot de pass incorecte';
    callback(msg);
  }
});
};
exports.login = login;

var afficheruser = function (callback){
  var queryString = 'SELECT id, login from user';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.afficheruser = afficheruser;

var lshardware = function (callback){
  var queryString = 'SELECT id, name, ip from equipement';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.lshardware = lshardware;

var countservice = function (callback){
  var queryString = 'SELECT COUNT(*) FROM service';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.countservice = countservice;

var lsservice = function (callback){
  var queryString = 'SELECT id, name, ip, port from service';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.lsservice = lsservice;

var lsserviceaping = function (callback){
  var queryString = 'SELECT ip, port from service';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows);
});
};
exports.lsserviceaping = lsserviceaping;

var deletuser = function (useradelet){ 
  connection.query('DELETE FROM user WHERE id = ? ;', [ useradelet ],  function(err, rows, fields) {
});
};
exports.deletuser = deletuser;

var delethardware = function (hardwareadelet){
  connection.query('DELETE FROM equipement WHERE id = ? ;', [ hardwareadelet ],  function(err, rows, fields) {
});
};
exports.delethardware = delethardware;

var deletservice = function (serviceadelet){
  connection.query('DELETE FROM service WHERE id = ? ;', [ serviceadelet ],  function(err, rows, fields) {
});
};
exports.deletservice = deletservice;

var ajoutuser = function (loginajouter, passwordajouter, access, callback){
connection.query('INSERT INTO user (login, password, access) VALUES (?, ?, ?);',[ loginajouter , passwordajouter, access],  function(err, rows, fields) {
    if (err) {
    var msg = 'il y a une erreur';
    callback(msg);
    }
    else {
    var msg = 'Done';
    callback(msg);
    }
});
};
exports.ajoutuser = ajoutuser;

var ajouterhardware = function (nameeq, ip){
connection.query('INSERT INTO equipement (name, ip) VALUES (?, ?);', [ nameeq , ip],  function(err, rows, fields) {
});
};
exports.ajouterhardware = ajouterhardware;

var ajouterservice = function (namese, ipse, portse){
connection.query('INSERT INTO service (name, ip, port) VALUES (?, ?, ?);', [ namese , ipse, portse],  function(err, rows, fields) {
});
};
exports.ajouterservice = ajouterservice;