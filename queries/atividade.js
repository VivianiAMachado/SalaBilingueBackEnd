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

//Atividades

 function getAllAtividades(req,res){
  connection.query("select * from ATIVIDADE_AULA"
  ,  function(error, data){
		if(!!error){
      return next(err);
		}
		else{
      res.status(200)
      .json(data)
		}
	});	
}

function getSingleAtividadesAula(req, res) {
  var aulaID = parseInt(req.params.id);
	connection.query("select * from ATIVIDADE_AULA	WHERE ID_AULA =" + aulaID +" order by ID_TIPO_ATIVIDADE", function(error, data){
		if(!!error){
      return next(error);
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

function getAtividadesAulaTipoAtiv(req, res) {
	var aulaID = parseInt(req.params.id);
	var idTipoAtividade = parseInt(req.params.id_tipo_atividade);
  connection.query("select * from ATIVIDADE_AULA where ID_AULA =" + aulaID +
	" and ID_TIPO_ATIVIDADE = "+ idTipoAtividade +
	" order by ID_TIPO_ATIVIDADE", function(error, data){
		if(!!error){
      return next(error);
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

function getAtividadesAulaTexto(req, res) {	
	 connection.query("select * " +
	" from ATIVIDADE_AULA  AA, ATIVIDADE_TEXTO ATX "+
	" WHERE AA.ID_AULA = "+ parseInt(req.params.id) +
	" AND ATX.ID_ATIVIDADE_AULA = AA.ID_ATIVIDADE_AULA "+
	" AND AA.ID_ATIVIDADE_AULA = " + parseInt(req.params.id_atividade_aula) +"",
	 function(error, data){
		if(!!error){
      return next(error);
		} 
		else{
      res.status(200)
      .json(data)
		}
	});	
}


function getAtividadesAulaTextoImagem(req, res) {	
	connection.query("select AA.ID_AULA,"+
	" (REPLACE(REPLACE(ATX.TEXTO,'*','<a  data-container=\"body\" data-toggle=\"popover\" data-placement=\"bottom\" data-img=\"{{ personagem.imagemUrl }}\" class=\"btn\">'"+
	" ),'?','</a>')) AS TEXTO, ATX.TEXTO_DATA "+
	" from ATIVIDADE_AULA  AA, ATIVIDADE_TEXTO ATX"+
	" WHERE AA.ID_AULA ="+ parseInt(req.params.id) +
	" AND ATX.ID_ATIVIDADE_AULA = AA.ID_ATIVIDADE_AULA "+
	" AND AA.ID_TIPO_ATIVIDADE = "+ parseInt(req.params.id_tipo_atividade) +
	" and AA.ID_ATIVIDADE_AULA ="+ parseInt(req.params.id_atividade_aula) +"",
	function(error, data){
		if(!!error){
      return next(error);
		} 
		else{
      res.status(200)
      .json(data)
		}
	});	
}

function getSingleAtividadesVerbetes(req, res) {	
	connection.query("select AA.ID_ATIVIDADE_AULA, V.DESCRICAO_VERBETE, V.*, OV.* "+
	" from ATIVIDADE_AULA AA, AULA_CARTAO AC, CARTAO_OBJETO CO, OBJETO_VERBETE OV, VERBETE V "+
	" WHERE AA.ID_AULA = "+ parseInt(req.params.id) +
	" AND AC.ID_AULA = AA.ID_AULA " +
	" AND AC.ID_CARTAO_VERBETE = CO.ID_CARTAO_VERBETE" +
	" AND CO.ID_OBJETO_VERBETE = OV.ID_OBJETO_VERBETE" +
	" AND V.ID_VERBETE = OV.ID_VERBETE " +
	" AND AA.ID_TIPO_ATIVIDADE = "+ parseInt(req.params.id_tipo_atividade) +
	" AND AA.ID_ATIVIDADE_AULA = " + parseInt(req.params.id_atividade_aula) +"",
	function(error, data){
	 if(!!error){
		 return next(error);
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

function getAtividadesMemoria(req, res) {	
	connection.query("SELECT AA.ID_ATIVIDADE_AULA, AA.ID_AULA, AA.ID_TIPO_ATIVIDADE," +
						 "AA.ID_TIPO_OBJETO2, AA.ID_TIPO_OBJETO1, AA.NUM_COLUNAS, AA.NUM_CARTAS," +
						 "AA.NUM_TENTATIVAS, AA.VIDEO, AA.NOME_ATIVIDADE," +
						 "AV.ID_ATIVIDADE_VERBETE, AV.ID_VERBETE,  " +
					 "AV.ID_OBJETO_VERBETE1, AV.ID_OBJETO_VERBETE2 " +
					 "FROM ATIVIDADE_AULA AA, ATIVIDADE_VERBETES AV " +
					 " WHERE AA.ID_ATIVIDADE_AULA = " + parseInt(req.params.id_atividade_aula) +"" +
					 " AND AA.ID_ATIVIDADE_AULA = AV.ID_ATIVIDADE_AULA " +
						 "AND V.ID_VERBETE = AV.ID_VERBETE " +
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
	getAllAtividades: getAllAtividades,
	getSingleAtividadesAula: getSingleAtividadesAula,
	getAtividadesAulaTipoAtiv: getAtividadesAulaTipoAtiv,
	getAtividadesAulaTexto: getAtividadesAulaTexto,
	getSingleAtividadesVerbetes: getSingleAtividadesVerbetes,
	getAtividadesMemoria: getAtividadesMemoria,
	getAtividadesAulaTextoImagem: getAtividadesAulaTextoImagem
};
