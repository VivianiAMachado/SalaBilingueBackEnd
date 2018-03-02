var express = require('express');
var router = express.Router();

var db  = require('../queries/memoria');


/**
 * @swagger
 * /api/atividadeMemoria/{id}:/{id_atividade_aula}:
 *   get:
 *     tags:
 *       - AtividadeMemoria
 *     description: Retorna as atividades de memoria de uma aula
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id da aula
 *         in: path
 *         required: true
 *         type: integer
 *       - name: id_atividade_aula
 *         description: id do tipo da atividade de memoria
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna as atividades da aula de memoria
 *       
 */

router.get('/api/atividadeMemoria/:id?/:id_atividade_aula?', db.getAtividadesAulaMemoria);


module.exports = router;
