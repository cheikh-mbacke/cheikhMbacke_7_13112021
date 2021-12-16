const express = require('express');
const router = express.Router();
const commentCrtl = require('../controllers/comment.controller');
const auth = require('../middleware/auth')
router.post('/create', auth, commentCrtl.createAComment);
router.post('/delete', commentCrtl.deleteAComment);

module.exports = router;