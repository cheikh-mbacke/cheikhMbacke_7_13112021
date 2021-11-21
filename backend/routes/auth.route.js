const express = require('express');
const router = express.Router();
const authCrtl = require('../controllers/auth.controller');
const multer = require('../middleware/multer-config');



router.post('/signup', authCrtl.signup);
router.post('/login', authCrtl.login);
router.post('/:id', multer, authCrtl.updateUser);

module.exports = router;