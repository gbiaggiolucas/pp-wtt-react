const { Router } = require('express');
const router = Router();

const { storeUser, login } = require('../controller/userController');

/**
 * @swagger
 * /create/account:
 *  post:
 *     summary: Cadastra um novo usuário
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type object
 */

router.post('/create/account', storeUser);

/**
 * @swagger
 * /auth/login:
 *  post:
 *     summary: Verifica um usuario
 *     responses:
 *       200:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type object
 */

router.post('/auth/login', login);

module.exports = router;