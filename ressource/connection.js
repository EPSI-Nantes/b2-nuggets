var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'stocks'
});

var selectuser = function (login, password, callback){
  var queryString = 'SELECT id, login, password, access from user WHERE login = "'+ login + '"';
	connection.query(queryString, function(err, rows, fields) {
    callback(rows[0]);
});
};