const router = require("express").Router();
const { Genre, Artist, Song, Album, Favorite } = require("../models");

const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const genreData = await Genre.findAll();
    const genres = genreData.map((genre) => genre.get({ plain: true }));

    res.render('landingpage', { genres, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/genre/:id",withAuth, async (req, res) => {
  try {
    const genreData = await Genre.findByPk(req.params.id, {
      include: [{ model: Artist }],
    });
    const genres = genreData.get({ plain: true });
    console.log(genres);
    //res.json(genres)
    res.render("genre", { genres, loggedIn: req.session.loggedIn});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/artist/:id",withAuth, async (req, res) => {
  try {
    const artistData = await Artist.findByPk(req.params.id, {
      include: [{ model: Album, include: [{ model: Song }] }],
    });
    if (!artistData) {
      res.json({ message: "no artist found by this id" });
    }
    const artist = artistData.get({ plain: true });
    const songs = artist.albums.map(album => album.songs)
    //console.log(songs);
    //res.json(artist)
    res.render("artist", { artist, songs, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/playlist",withAuth, async (req, res) => {
  try {
    const playlistData = await Favorite.findAll();
    const playlists = playlistData.map((playlist) =>  playlist.get({ plain: true }));
    res.render('favorites', { playlists, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", { loggedIn: req.session.loggedIn });
});

module.exports = router;
