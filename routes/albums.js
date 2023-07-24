const express = require('express');
const router = express.Router();

const albumsCtrl = require('../controllers/albums');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /albums
router.get('/', ensureLoggedIn, albumsCtrl.index);
// GET /albums/new
router.get('/new', ensureLoggedIn, albumsCtrl.new);
// GET /albums/:id 
router.get('/:id', albumsCtrl.show);
// POST /albums
router.post('/', ensureLoggedIn, albumsCtrl.create);
	
module.exports = router;