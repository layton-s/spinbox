const Genre = require('../models/genre');
const Album = require('../models/album');

module.exports = {
  new: newGenre,
  create,
  addToList
};

async function addToList(req, res) {
  const album = await Album.findById(req.params.id);
  album.genreList.push(req.body.genreId);
  await album.save();
  res.redirect(`/albums/${album._id}`);
}

async function newGenre(req, res) {
  const genres = await Genre.find({}).sort('name');
  res.render('genres/new', { title: 'Add Genre', genres });
}

async function create(req, res) {
  try {
    await Genre.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/genres/new');
}