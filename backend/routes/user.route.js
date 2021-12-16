const express = require('express');
const router = express.Router();
const userCrtl = require('../controllers/user.controller');
const auth = require('../middleware/auth')
router.delete('/delete', userCrtl.deleteUser);
router.get('/:id', auth, userCrtl.getOneUser);

module.exports = router;