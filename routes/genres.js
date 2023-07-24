const express = require('express');
const router = express.Router();
const genresCtrl = require('../controllers/genres');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// This router is mounted to a "starts with" path of '/'

// GET /genres/new 
router.get('/genres/new', ensureLoggedIn, genresCtrl.new);
// POST /genres 
router.post('/genres', ensureLoggedIn, genresCtrl.create);
// POST /albums/:id/genres 
router.post('/albums/:id/genres', ensureLoggedIn, genresCtrl.addToList);

module.exports = router;