const express = require('express');
const router = express.Router();
const authCrtl = require('../controllers/auth');
const auth = require('../middleware/auth');

router.post('/signup', authCrtl.signup);
router.post('/login', authCrtl.login);

module.exports = router;