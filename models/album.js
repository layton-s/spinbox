const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});

const albumSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  releaseYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: 1900
  },
  label: {
    type: String,
    required: true
  },
  genreList: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre'
  }],
  reviews: [reviewSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Album', albumSchema);