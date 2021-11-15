const express = require('express');
const router = express.Router();
const sauceCrtl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//autorisation non correcte
router.post('/', auth, multer, sauceCrtl.createSauce);
router.post('/:id/like', auth, sauceCrtl.likeSauce);
router.get('/', auth, sauceCrtl.getAllSauce);
router.get('/:id', auth, sauceCrtl.getOneSauce);
router.put('/:id', auth, multer, sauceCrtl.modifySauce)
router.delete('/:id', auth, sauceCrtl.deleteSauce);


module.exports = router;