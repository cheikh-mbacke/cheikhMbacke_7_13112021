const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authCrtl = require('../controllers/auth');
const test = require('../controllers/test');


router.post('/signup', authCrtl.signup);
router.post('/login', authCrtl.login);
router.get('/post', auth, test.posts);

module.exports = router;