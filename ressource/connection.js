var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'stocks'
});

var selectuser = function (login, password){
	connection.connect();
  var queryString = 'SELECT id, login, password, access from user WHERE login = "'+ login + '"';    //je prépare ma requête
	connection.query(queryString, function(err, rows, fields) {                                       //j’exécute ma requête
  connection.end();
    console.log(rows[0]);
    callback(rows[0]);                          //je veux retourner la réponse avec tout les valeur pour faire  
                                                //un traitement et des redirection en fonction de sont accès 
});
};
exports.selectuser = selectuser;