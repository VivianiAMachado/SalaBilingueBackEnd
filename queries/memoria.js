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

function getAtividadesAulaMemoria(req, res) {	
     connection.query("SELECT AA.ID_ATIVIDADE_AULA, AA.ID_AULA, AA.ID_TIPO_ATIVIDADE,"+
     " AA.ID_TIPO_OBJETO2, AA.ID_TIPO_OBJETO1, AA.NUM_COLUNAS, AA.NUM_CARTAS,"+
     " AA.NUM_TENTATIVAS, AA.VIDEO, AA.NOME_ATIVIDADE,"+
     " AV.ID_ATIVIDADE_VERBETE, AV.ID_VERBETE, V.DESCRICAO_VERBETE , "+
     " AV.ID_OBJETO_VERBETE1, OV1.OBJETO_FILE_NAME OBJETO_FILE_NAME1, "+
     " OV1.OBJETO_CONTENT_TYPE OBJETO_CONTENT_TYPE1, OV1.OBJETO_DATA OBJETO_DATA1, "+
     " AV.ID_OBJETO_VERBETE2, OV2.OBJETO_FILE_NAME OBJETO_FILE_NAME2, "+
     " OV2.OBJETO_CONTENT_TYPE OBJETO_CONTENT_TYPE2, OV2.OBJETO_DATA OBJETO_DATA2"+
     " FROM ATIVIDADE_AULA AA"+
            " INNER JOIN ATIVIDADE_VERBETES AV"+
            "     ON AA.ID_ATIVIDADE_AULA = AV.ID_ATIVIDADE_AULA"+
            " INNER JOIN VERBETE V"+
            "     ON V.ID_VERBETE = AV.ID_VERBETE"+
            " LEFT JOIN OBJETO_VERBETE OV1"+
            "     ON AV.ID_OBJETO_VERBETE1 = OV1.ID_OBJETO_VERBETE"+
            " LEFT JOIN OBJETO_VERBETE OV2"+
            "     ON AV.ID_OBJETO_VERBETE2 = OV2.ID_OBJETO_VERBETE "+
    "  WHERE AA.ID_ATIVIDADE_AULA =" + parseInt(req.params.id_atividade_aula) +
    "  AND  AA.ID_AULA= " + parseInt(req.params.id) +"" ,
	 function(error, data){
		if(!!error){
      return next(error);
		} 
		else{
      res.status(200)
      .json(data
       
      )
		}
	});	
}

module.exports = {
	getAtividadesAulaMemoria:getAtividadesAulaMemoria
};
