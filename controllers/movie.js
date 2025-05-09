const Movie = require('../models/Movie');
const { errorHandler } = require('../auth');

module.exports.addMovie = (req, res) => {
  let newMovie = new Movie({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    description: req.body.description,
    genre: req.body.genre,
  });

  return newMovie
    .save()
    .then((result) => res.status(201).send(result))
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getMovies = (req, res) => {
  return Movie.find({})
    .then((result) =>
      res.status(200).send({
        success: true,
        movies: result,
      })
    )
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getMovie = (req, res) => {
  return Movie.findOne({ _id: req.params.id })
    .then((result) =>
      res.status(200).send({
        success: true,
        movies: result,
      })
    )
    .catch((err) => errorHandler(err, req, res));
};

module.exports.updateMovie = (req, res) => {
  let updatedMovie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    description: req.body.description,
    genre: req.body.genre,
  };

  return Movie.findByIdAndUpdate(req.params.id, updatedMovie, { new: true })
    .then((movie) => {
      if (movie) {
        res.status(200).send({
          success: true,
          message: 'Movie updated successfully',
          updatedMovie: movie,
        });
      } else {
        res.status(404).send({
          message: 'Movie not found',
        });
      }
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.deleteMovie = (req, res) => {
  return Movie.findByIdAndDelete(req.params.id)
    .then((movie) => {
      if (movie) {
        res.status(200).send({
          success: true,
          message: 'Movie deleted successfully',
        });
      } else {
        res.status(404).send({
          message: 'Movie not found',
        });
      }
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getMovie = (req, res) => {
  return Movie.find({ _id: req.params.id })
    .then((result) =>
      res.status(200).send({
        success: true,
        movies: result,
      })
    )
    .catch((err) => errorHandler(err, req, res));
};

module.exports.addComment = (req, res) => {
  return Movie.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { userId: req.user.id, comment: req.body.comment } } },
    { new: true }
  )
    .then((movie) => {
      if (movie) {
        res.status(200).send({
          success: true,
          message: 'Comment added successfully',
          updatedMovie: movie,
        });
      } else {
        res.status(404).send({
          message: 'Movie not found',
        });
      }
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getComments = (req, res) => {
  return Movie.findById(req.params.id)
    .then((movie) => {
      if (movie) {
        res.status(200).send({
          success: true,
          comments: movie.comments,
        });
      } else {
        res.status(404).send({
          message: 'Movie not found',
        });
      }
    })
    .catch((err) => errorHandler(err, req, res));
};
