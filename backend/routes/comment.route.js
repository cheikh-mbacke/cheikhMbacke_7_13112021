const express = require('express');
const router = express.Router();
const commentCrtl = require('../controllers/comment.controller');
router.post('/create', commentCrtl.createAComment);
router.post('/delete', commentCrtl.deleteAComment);
router.get('/getComments', commentCrtl.getAllcomments);

module.exports = router;