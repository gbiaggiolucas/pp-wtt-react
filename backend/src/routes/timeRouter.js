const { Router } = require('express');
const router = Router();

const { sendTime, getTime } = require('../controller/timeController');

/**
 * @swagger
 * /create/account:
 *  post:
 *     summary: Envia o tempo em redes sociais
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

router.post('/time/send', sendTime);

/**
 * @swagger
 * /auth/login:
 *  get:
 *     summary: Adquire o tempo em redes sociais enviado
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

router.get('/time/get/:email', getTime);

module.exports = router;