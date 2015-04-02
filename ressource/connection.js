var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'stocks'
});

var selectuser = function (login, password, callback){
	//connection.connect();
  var queryString = 'SELECT id, login, password, access from user WHERE login = "'+ login + '"';    //je prépare ma requête
	connection.query(queryString, function(err, rows, fields) {                                       //j’exécute ma requête
  //connection.end();
  if (!err) {
    callback(rows[0]);
    }
  else{
    callback(err);
      }
});
};






















// function selectuser (login, password, callback) {
//     var query = connection.query('SELECT id, login, password, access from user WHERE login = "'+ login + '"');
//     console.log('PREMIERRRRRRRRRRRRRRRRRRRRRR' + rows)
//     query.on('result', function(row) {
//         console.log('DEUXIEEEEEMMMMMMMMMMMMMM' + rows)
//         callback(null, row.dynamicField);
//     });
// };
exports.selectuser = selectuser;