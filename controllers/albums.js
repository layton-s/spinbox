const Album = require('../models/album');
const Genre = require('../models/genre');

module.exports = {
  index,
  show,
  new: newAlbum,
  create,
  delete: deleteAlbum
};

async function index(req, res) {
    const user = req.user;
    const albums = await Album.find({});
    title = user.googleId ? `${user.name}'s SpinBox` : (user.spotifyId ? `${user.name}'s SpinBox` : 'Your Albums');
    res.render('albums/index', { title, albums });
  }

async function show(req, res) {
  const album = await Album.findById(req.params.id).populate('genreList');
  const genres = await Genre.find({ _id: { $nin: album.genreList } }).sort('name');
  res.render('albums/show', { title: 'Album Details', album, genres });
}

function newAlbum(req, res) {
  res.render('albums/new', { title: 'Expand your SpinBox', errorMsg: '' });
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

async function deleteAlbum(req, res) {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);

    if (!album) {
      return res.redirect('/albums/');
    }

    res.redirect('/albums/');
  } catch (err) {
    console.error(err);
    res.redirect('/albums/');
  }
}