"use latest"; // 'enable es6'

const rp = require("request-promise");
const MongoClient = require("mongodb").MongoClient;

/**
 * Netflix Roulette example
 *
 * Help find something to watch when the family is in town!
 *
 * @webtask_data profile        - predefined user profile
 * @webtask_data genre          - movie/tv genre
 * @webtask_data content_kind   - content kind: movie|show|both
 * @webtask_data minimum_imdb   - minimum imdb rating
 * @webtask_data minimum_rt     - minimum rt rating
 *
 * EXAMPLE (cUrl):
 *
 * // Retrieve a movie recommendation for the "Travis" profile
 *
 * curl -s \
 * -XPOST \
 * -H 'Content-Type: application/json' \
 * --data '{ "profile": "travis" }' \
 * "https://wt-ed59ec259186359bcf843a1acdd3d65e-0.run.webtask.io/movie-picker"
 *
 */

// CONSTANTS
const API_URL = "https://api.reelgood.com/v1/roulette/netflix";
const GENRES_BY_ID = {
  0: { "id": 0, "name": "All Genres", "slug": "all" },
  5: { "id": 5, "name": "Action & Adventure", "content_kind": "both", "slug": "action-and-adventure" },
  6: { "id": 6, "name": "Animation", "content_kind": "both", "slug": "animation" },
  39: { "id": 39, "name": "Anime", "content_kind": "both", "slug": "anime" },
  7: { "id": 7, "name": "Biography", "content_kind": "movie", "slug": "biography" },
  8: { "id": 8, "name": "Children", "content_kind": "both", "slug": "children" },
  10: { "id": 10, "name": "Crime", "content_kind": "both", "slug": "crime" },
  41: { "id": 41, "name": "Cult", "content_kind": "movie", "slug": "cult" },
  9: { "id": 9, "name": "Comedy", "content_kind": "both", "slug": "comedy" },
  11: { "id": 11, "name": "Documentary", "content_kind": "both", "slug": "documentary" },
  3: { "id": 3, "name": "Drama", "content_kind": "both", "slug": "drama" },
  12: { "id": 12, "name": "Family", "content_kind": "both", "slug": "family" },
  13: { "id": 13, "name": "Fantasy", "content_kind": "both", "slug": "fantasy" },
  15: { "id": 15, "name": "Food", "content_kind": "show", "slug": "food" },
  16: { "id": 16, "name": "Game Show", "content_kind": "show", "slug": "game-show" },
  17: { "id": 17, "name": "History", "content_kind": "both", "slug": "history" },
  18: { "id": 18, "name": "Home & Garden", "content_kind": "show", "slug": "home-and-garden" },
  19: { "id": 19, "name": "Horror", "content_kind": "both", "slug": "horror" },
  43: { "id": 43, "name": "Independent", "content_kind": "movie", "slug": "independent" },
  37: { "id": 37, "name": "LGBTQ", "content_kind": "both", "slug": "lgbtq" },
  22: { "id": 22, "name": "Musical", "content_kind": "movie", "slug": "musical" },
  23: { "id": 23, "name": "Mystery", "content_kind": "both", "slug": "mystery" },
  25: { "id": 25, "name": "Reality", "content_kind": "show", "slug": "reality" },
  4: { "id": 4, "name": "Romance", "content_kind": "movie", "slug": "romance" },
  26: { "id": 26, "name": "Science-Fiction", "content_kind": "both", "slug": "science-fiction" },
  29: { "id": 29, "name": "Sport", "content_kind": "both", "slug": "sport" },
  45: { "id": 45, "name": "Stand-up & Talk", "content_kind": "both", "slug": "stand-up-and-talk" },
  32: { "id": 32, "name": "Thriller", "content_kind": "movie", "slug": "thriller" },
  33: { "id": 33, "name": "Travel", "content_kind": "show", "slug": "travel" }
};

const GENRES_BY_SLUG = {
  "all": { "id": 0, "name": "All Genres", "slug": "all" },
  "action-and-adventure": { "id": 5, "name": "Action & Adventure", "content_kind": "both", "slug": "action-and-adventure" },
  "animation": { "id": 6, "name": "Animation", "content_kind": "both", "slug": "animation" },
  "anime": { "id": 39, "name": "Anime", "content_kind": "both", "slug": "anime" },
  "biography": { "id": 7, "name": "Biography", "content_kind": "movie", "slug": "biography" },
  "children": { "id": 8, "name": "Children", "content_kind": "both", "slug": "children" },
  "crime": { "id": 10, "name": "Crime", "content_kind": "both", "slug": "crime" },
  "cult": { "id": 41, "name": "Cult", "content_kind": "movie", "slug": "cult" },
  "comedy": { "id": 9, "name": "Comedy", "content_kind": "both", "slug": "comedy" },
  "documentary": { "id": 11, "name": "Documentary", "content_kind": "both", "slug": "documentary" },
  "drama": { "id": 3, "name": "Drama", "content_kind": "both", "slug": "drama" },
  "family": { "id": 12, "name": "Family", "content_kind": "both", "slug": "family" },
  "fantasy": { "id": 13, "name": "Fantasy", "content_kind": "both", "slug": "fantasy" },
  "food": { "id": 15, "name": "Food", "content_kind": "show", "slug": "food" },
  "game-show": { "id": 16, "name": "Game Show", "content_kind": "show", "slug": "game-show" },
  "history": { "id": 17, "name": "History", "content_kind": "both", "slug": "history" },
  "home-and-garden": { "id": 18, "name": "Home & Garden", "content_kind": "show", "slug": "home-and-garden" },
  "horror": { "id": 19, "name": "Horror", "content_kind": "both", "slug": "horror" },
  "independent": { "id": 43, "name": "Independent", "content_kind": "movie", "slug": "independent" },
  "lgbtq": { "id": 37, "name": "LGBTQ", "content_kind": "both", "slug": "lgbtq" },
  "musical": { "id": 22, "name": "Musical", "content_kind": "movie", "slug": "musical" },
  "mystery": { "id": 23, "name": "Mystery", "content_kind": "both", "slug": "mystery" },
  "reality": { "id": 25, "name": "Reality", "content_kind": "show", "slug": "reality" },
  "romance": { "id": 4, "name": "Romance", "content_kind": "movie", "slug": "romance" },
  "science-fiction": { "id": 26, "name": "Science-Fiction", "content_kind": "both", "slug": "science-fiction" },
  "sport": { "id": 29, "name": "Sport", "content_kind": "both", "slug": "sport" },
  "stand-up-and-talk": { "id": 45, "name": "Stand-up & Talk", "content_kind": "both", "slug": "stand-up-and-talk" },
  "thriller": { "id": 32, "name": "Thriller", "content_kind": "movie", "slug": "thriller" },
  "travel": { "id": 33, "name": "Travel", "content_kind": "show", "slug": "travel" }
};

module.exports = function(context, cb) {

  // connect to mongodb
  const MONGO_URL = context.secrets.MONGO_URL;

  let profile = context.body.profile || "default";

  // get profiles
  MongoClient.connect(MONGO_URL, function(err, db) {
    handleError(err, cb);
    db.collection("profile").findOne({
      name: profile
    }, function(err, result) {
      handleError(err);
      getMovieRecommendation(result);
      db.close();
    });
  });

  function handleError (err) {
    if (err) {
      console.error(err);
      cb(err);
    }
  }

  function getMovieRecommendation (item) {
    // params
    let genre = context.body.genre || item.genre;
    let content_kind = context.body.content_kind || item.content_kind;
    let minimum_imdb = context.body.minimum_imdb || item.minimum_imdb;
    let minimum_rt = context.body.minimum_rt || item.minimum_rt;

    genre = typeof genre === "number"
      ? GENRES_BY_ID[genre].id
      : getRandomWeightedGenre(genre); // get a random, weighted genre based on profile preferences

    const options = {
      method: "GET",
      uri: API_URL,
      qs: {
        nocache: true,
        genre,
        content_kind,
        minimum_imdb,
        minimum_rt,
        availability: "onAnySource"
      },
      json: true
    };

    rp(options)
      .then(function(res) {
        console.dir(res);
        cb(null, res);
      })
      .catch(function(err) {
        cb(err);
      });
  }

  function getRandomWeightedGenre (genreArray) {
    let weightedGenreArray = [];

    for (let i = 0; i < genreArray.length; i++) {
      let [genreKey, weight] = genreArray[i];
      while (weight > 0) {
        weightedGenreArray.push(GENRES_BY_SLUG[genreKey]);
        weight--;
      }
    }
    const randomIndex = ~~(Math.random() * weightedGenreArray.length);
    const genre = weightedGenreArray[randomIndex];
    return genre.id;
  }

};
