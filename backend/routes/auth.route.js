const express = require('express');
const router = express.Router();
const authCrtl = require('../controllers/auth.controller');


router.post('/signup', authCrtl.signup);
router.post('/signin', authCrtl.signin);

module.exports = router;