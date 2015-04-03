var mysql = require('mysql');
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'stocks',
    }
);

var selectuser = function (login, password, callback){
  var queryString = 'SELECT id, login, password, access from user WHERE login = "'+ login + '"';
	connection.query(queryString, function(err, rows, fields) {
    callback(rows[0]);
});
};
exports.selectuser = selectuser;

var afficheruser = function (callback){
  var queryString = 'SELECT id, login from user';
  connection.query(queryString, function(err, rows, fields) {
    callback(rows[0]);
});
};
exports.afficheruser = afficheruser;

var ajoutuser = function (loginajouter, passwordajouter, access, callback){
  var queryString = 'INSERT INTO user (login, password, access) VALUES ("'+ loginajouter +'", "'+ passwordajouter +'", "'+ access +'");';
	connection.query(queryString, function(err, fields) {
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

var deletuser = function (useradelet, callback){
  var queryString = 'DELETE FROM user WHERE id='+ useradelet + '';
  connection.query(queryString, function(err, fields) {
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
exports.deletuser = deletuser;