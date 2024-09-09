const { Router } = require('express');
const router = Router();

const { storeUser, login } = require('../controller/userController');

router.post('/create/account', storeUser);
router.post('/auth/login', login);

module.exports = router;