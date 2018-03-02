var express = require('express');
var router = express.Router();

//var db = {};// = require('../queries/atividade');
var db  = require('../queries/atividade');

/**
 * @swagger
 * definitions:
 *   AtividadeTexto:
 *     properties:
 *       id_tipo_atividade:
 *         type: integer
 */

 /**
 * @swagger
 * /api/atividades:
 *   get:
 *     tags:
 *       - Atividades
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: ''
 */
 router.get('/api/atividades', db.getAllAtividades);

/*router.get('/api/atividades', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([{ 
        ID_ATIVIDADE_AULA: 1,
        texto: 'teste' 
    }]));
});*/



/**
 * @swagger
 * /api/atividadesAula/{id}:
 *   get:
 *     tags:
 *       - Atividades
 *     description: Retorna as atividades de uma aula
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Aula's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna as atividades da aula
 *         schema:
 *           $ref: ''
 */
router.get('/api/atividadesAula/:id', db.getSingleAtividadesAula);

/**
 * @swagger
 * /api/atividadesVerbetes/{id}:/{id_tipo_atividade}:/{id_atividade_aula}:
 *   get:
 *     tags:
 *       - AtividadesVerbetes
 *     description: Retorna as atividades de uma aula
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Aula's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: id_tipo_atividade
 *         description: id do tipo da atividade
 *         in: path
 *         required: true
 *         type: integer
 *       - name: id_atividade_aula
 *         description: id da atividade aula
 *         in: path
 *         required: true
 *         type: integer
 *      
 *     responses:
 *       200:
 *         description: Retorna os verbetes das atividades da aula
 *         schema:
 *           $ref: ''
 */
router.get('/api/atividadesVerbetes/:id?/:id_tipo_atividade?/:id_atividade_aula?', db.getSingleAtividadesVerbetes);

/**
 * @swagger
 * /api/tipoAtividadesAula/{id}:/{id_tipo_atividade}:
 *   get:
 *     tags:
 *       - Atividades
 *     description: Retorna as atividades de uma aula
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id da aula
 *         in: path
 *         required: true
 *         type: integer
 *       - name: id_tipo_atividade
 *         description: id do tipo da atividade
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna as atividades da aula
 *         schema:
 *           $ref: ''
 */

router.get('/api/tipoAtividadesAula/:id?/:id_tipo_atividade?', db.getAtividadesAulaTipoAtiv);

/**
 * @swagger
 * /api/atividadeAulaTexto/{id}:/{id_atividade_aula}:
 *   get:
 *     tags:
 *       - AtividadeTexto
 *     description: Retorna as atividades de uma aula
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id da aula
 *         in: path
 *         required: true
 *         type: integer
 *       - name: id_atividade_aula
 *         description: id do tipo da atividade
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna as atividades da aula
 *       
 */

router.get('/api/atividadeAulaTexto/:id?/:id_atividade_aula?', db.getAtividadesAulaTexto);

/**
 * @swagger
 * /api/atividadeAulaTextoImagem/{id}:/{id_tipo_atividade}:/{id_atividade_aula}:
 *   get:
 *     tags:
 *       - AtividadeTexto
 *     description: Retorna as atividades de uma aula
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id da aula
 *         in: path
 *         required: true
 *         type: integer
 *       - name: id_tipo_atividade
 *         description: id do tipo de atividade
 *         in: path
 *         required: true
 *         type: integer
 *       - name: id_atividade_aula
 *         description: id da atividade aula
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna as atividades da aula
 *       
 */
router.get('/api/atividadeAulaTextoImagem/:id?/:id_tipo_atividade?/:id_atividade_aula?', db.getAtividadesAulaTextoImagem);
 /**
 * @swagger
 * /api/atividadeLiga:
 *   get:
 *     tags:
 *       - Atividade Liga
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: ''
 */

 /**
 * @swagger
 * /api/atividadeQuizImagem:
 *   get:
 *     tags:
 *       - Atividade Quiz Imagem
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: ''
 */


 /**
 * @swagger
 * /api/atividadeQuizTexto:
 *   get:
 *     tags:
 *       - Atividade Quiz Texto
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: ''
 */


module.exports = router;
