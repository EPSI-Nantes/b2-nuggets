var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nuggets'
});

function insert(identifiant, mdp){ 
connection.connect(); 
	connection.query('SELECT id, identifiant, mdp FROM membres WHERE identifiant = '+ identifiant +' ;', function(err, rows, fields) { 
		if (!err) 
		console.log('identifiant');
		else
		console.log('Error !');
		});

connection.end();
};