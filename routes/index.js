var express = require('express');
var router = express.Router();

//var db = {};// = require('../queries/queries');
var db = require('../queries/queries');

 /**
 * @swagger
 * /api/dicionario:
 *   get:
 *     tags:
 *       - Dicionario
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
 * /api/usuario:
 *   get:
 *     tags:
 *       - Usuarios
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
 * /api/turma:
 *   get:
 *     tags:
 *       - Turma
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
 * /api/aluno:
 *   get:
 *     tags:
 *       - Aluno
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
 * /api/aulas:
 *   get:
 *     tags:
 *       - Aulas
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: ''
 */
router.get('/api/aulas', db.getAllAulas);


module.exports = router;
