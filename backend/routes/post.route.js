const express = require('express');
const router = express.Router();
const postCrtl = require('../controllers/post.controller');
const multer = require('../middleware/multer-config');
router.post('/text', postCrtl.createATextPost);
router.post('/link', postCrtl.createALinkPost);
router.post('/video', multer, postCrtl.createAVideoPost);


module.exports = router;