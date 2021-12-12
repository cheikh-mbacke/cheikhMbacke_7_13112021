const express = require('express');
const router = express.Router();
const postCrtl = require('../controllers/post.controller');
const multer = require('../middleware/multer-config');
router.post('/text', postCrtl.createATextPost);
router.post('/link', postCrtl.createALinkPost);
router.post('/video', multer, postCrtl.createAVideoPost);
router.post('/img', multer, postCrtl.createAImgPost);
router.post('/allPosts', postCrtl.getAllPosts);
router.post('/like', postCrtl.likeAPost);
router.post('/dislike', postCrtl.dislikeAPost);
router.get('/getAllLikes', postCrtl.getAllLikes);
router.get('/getAllDislikes', postCrtl.getAllDislikes);
router.get('/userReact', postCrtl.userReact);

module.exports = router;