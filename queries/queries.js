var mysql = require('mysql2');
var Client = require('ssh2').Client;
var ssh = new Client();

var db = new Promise(function(resolve, reject){
	ssh.on('ready', function() {
	  ssh.forwardOut(
	     // endereço de origem, geralmente pode ser qualquer endereço válido
	    '127.0.0.1',
	    // porta de origem, este pode ser qualquer número de porta válido
	    5000,
	   // endereço de destino (localhost aqui se refere ao servidor SSH)
	    '127.0.0.1',
	     // porta de destino
	    3306,
	    function (err, stream) {
	      if (err) throw err; // erro SSH: também pode enviar erro na promessa ex. rejeitar (err)
	      // use a conexão `sql` como de costume
	     connection = mysql.createConnection({
	          host     : 'localhost',
	          user     : 'root',
	          password : 'sab', 
	          database : 'SALABI',
	          stream: stream
	        });

	          // envia conexão de volta em variável dependendo do sucesso ou não
		connection.connect(function(err){
			if(!!err){
				console.log('Error');
				resolve(connection);
			}
			else{
				console.log('Connected!!');
			}
		});
	  });
	}).connect({
	  host: '200.132.53.141',
	  port: 22,
	  username: 'vivi',
	  password: 'vi2805'
	});
});

var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

//var pgp = require('pg-promise')(options);
//var connectionString = 'localhost:3000/aulas';
//var db = pgp(db1);

function getAllPuppies(req, res, next) {
  db.any('select * from pups')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from pups where id = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPuppy(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into pups(name, breed, age, sex)' +
      'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatePuppy(req, res, next) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
//Aulas

 function getAllAulas(req,res){
  connection.query("SELECT * "+
  "FROM ALUNO AL"+
  " INNER JOIN USUARIO USR"+
  " ON AL.ID_PESSOA = USR.ID_PESSOA"+
  " INNER JOIN TURMA_ALUNO TA"+
  " ON TA.ID_ALUNO = AL.ID_ALUNO"+
  " INNER JOIN TURMA_PROFESSOR TP "+
  " ON TP.ID_TURMA = TA.ID_TURMA "+
  " INNER JOIN AULA_TURMA AUT"+
  " ON AUT.ID_TURMA_PROFESSOR = TP.ID_TURMA_PROFESSOR"+
  " WHERE AUT.PUBLICADA = 'S' "+       
  " ORDER BY DATA_AULA DESC"
  ,  function(error, data){
		if(!!error){
      return next(err);
		}
		else{
      res.status(200)
      .json(
        {
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        }
      )
		}
	});	
}

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy,
  getAllAulas: getAllAulas
};
