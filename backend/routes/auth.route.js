const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authCrtl = require('../controllers/auth.controller');


router.post('/signup', authCrtl.signup);
router.post('/login', authCrtl.login);

module.exports = router;