var mysql = require('mysql');
var connection = mysql.createConnection(
{
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'stocks',
}
);

//enregistrement des elements
var enregistrementElements = function (id, x, y, callback){
	var queryString = 'UPDATE elements SET x = "' + x +'", y = "' + y +'" WHERE id = "'+ id + '"';
	connection.query(queryString, function(err, rows, fields) {
		callback(rows[0]);
	});
};

//verification user+mdp
var selectuser = function (login, password, callback){
	var queryString = 'SELECT id, login, password, access from user WHERE login = "'+ login + '"';
	connection.query(queryString, function(err, rows, fields) {
		callback(rows[0]);
	});
};

exports.selectuser = selectuser;