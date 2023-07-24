const Album = require('../models/album');
const Genre = require('../models/genre');

module.exports = {
  index,
  show,
  new: newAlbum,
  create
};

async function index(req, res) {
    if (!req.user) {
      // Handle case when the user is not authenticated
      const albums = await Album.find({});
      return res.render('albums/index', { title: 'Your Albums', albums });
    }
    const user = req.user;
    const albums = await Album.find({});
  
    // Check if the user is logged in with Google and has a name
    const title = user.googleId ? `${user.name}'s SpinBox` : 'Your Albums';
  
    res.render('albums/index', { title, albums });

    
  }

async function show(req, res) {
  const album = await Album.findById(req.params.id).populate('genreList');
  const genres = await Genre.find({ _id: { $nin: album.genreList } }).sort('name');
  res.render('albums/show', { title: 'Album Details', album, genres });
}

function newAlbum(req, res) {
  res.render('albums/new', { title: 'Add Album', errorMsg: '' });
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const album = await Album.create(req.body);
    res.redirect(`/albums/${album._id}`);
  } catch (err) {
    console.log(err);
    res.render('albums/new', { errorMsg: err.message });
  }
}