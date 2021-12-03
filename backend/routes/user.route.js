const express = require('express');
const router = express.Router();
const userCrtl = require('../controllers/user.controller');
router.delete('/delete', userCrtl.deleteUser);
router.get('/std', userCrtl.standardsUsers);
router.get('/admin', userCrtl.adminUsers);

module.exports = router;