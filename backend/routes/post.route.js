const express = require('express');
const router = express.Router();
const postCrtl = require('../controllers/post.controller');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth')
router.get('/',  postCrtl.getAllPosts);
router.post('/text', auth, postCrtl.createATextPost);
router.post('/link', auth, postCrtl.createALinkPost);
router.post('/video', auth, multer, postCrtl.createAVideoPost);
router.post('/delete', postCrtl.deletePost);
router.post('/img', auth, multer, postCrtl.createAImgPost);
router.put('/:id/update/', postCrtl.updateAPost);
router.post('/like', postCrtl.likeAPost);
router.post('/dislike', postCrtl.dislikeAPost);



module.exports = router;