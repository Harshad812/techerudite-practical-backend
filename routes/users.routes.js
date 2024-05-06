const { create, login } = require('../controller/user.controller');

const router = require('express').Router();

router.post('/', create);
router.post('/login', login);

module.exports = router;
