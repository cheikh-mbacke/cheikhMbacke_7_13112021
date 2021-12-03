const express = require('express');
const router = express.Router();
const commentCrtl = require('../controllers/comment.controller');
router.post('/create', commentCrtl.createAComment);
router.get('/getComments', commentCrtl.getAllcomments);

module.exports = router;