'use latest'; // 'enable es6'

const rp = require('request-promise');
const MongoClient = require('mongodb').MongoClient;

/**
 * Netflix Roulette example
 *
 * Help find something to watch when the family is in town!
 *
 * @webtask_data profile      - predefined user profile
 * @webtask_data genre        - movie/tv genre
 * @webtask_data movies       - include movies
 * @webtask_data tv           - include tv shows
 * @webtask_data lowrating    - lowest rating
 * @webtask_data highrating   - highest rating
 * @webtask_data director     - director
 * @webtask_data actor        - actor
 * @webtask_data keyword      - keyword
 *
 * EXAMPLE (cUrl):
 *
 * // Retrieve a movie recommendation for the "Travis" profile
 * curl -s -XPOST --data "profile=travis" \
 * "https://wt-ed59ec259186359bcf843a1acdd3d65e-0.run.webtask.io/movie-picker" \
 * | grep -Eo "<h1>.*</h1>" \
 * | sed -E 's|<h1>(.*)</h1>|\1|'
 *
 */

// CONSTANTS
const API_URL = 'https://netflixroulette.net/core/mediaSpin.php';
const GENRES = {
    all: 'All',
    action: 'Action &amp; Adventure',
    anime: 'Anime',
    children: 'Children &amp; Family Movies',
    classic: 'Classic Movies',
    comedy: 'Comedies',
    documentary: 'Documentaries',
    drama: 'Dramas',
    religous: 'Faith and Spirituality',
    foreign: 'Foreign Movies',
    gay: 'Gay &amp; Lesbian Movies',
    horror: 'Horror Movies',
    indi: 'Independent Movies',
    acclaimed: 'Oscar-winning Movies',
    romantic: 'Romantic Movies',
    scifi: 'Sci-Fi &amp; Fantasy',
    sports: 'Sports Movies',
    thriller: 'Thrillers',
    tv: 'TV Shows'
};

module.exports = function (context, cb) {

    // connect to mongodb
    const MONGO_URL = context.secrets.MONGO_URL;

    let profile = context.body.profile || 'default';

    // get profiles
    MongoClient.connect(MONGO_URL, function (err, db) {
        handleError(err, cb);
        db.collection("profile").findOne({
            "name": profile
        }, function (err, result) {
            handleError(err);
            getMovieRecommendation(result);
            db.close();
        });
    });

    function handleError(err) {
        if (err) {
            console.error(err);
            cb(err)
        }
    }

    function getMovieRecommendation(item) {
        // params
        let genre = context.body.genre || item.genre;
        let movies = context.body.movies || item.movies;
        let tv = context.body.tv || item.tv;
        let lowrating = context.body.lowrating || item.lowrating;
        let highrating = context.body.highrating || item.highrating;
        let director = context.body.director || item.director;
        let actor = context.body.actor || item.actor;
        let keyword = context.body.keyword || item.keyword;

        // get a random, weighted genre based in profile preferences
        genre = typeof genre === 'string' ? GENRES[genre] : getRandomWeightedGenre(genre);

        const options = {
            method: 'POST',
            uri: API_URL,
            form: {
                genre,
                movies,
                tv,
                lowrating,
                highrating,
                director,
                actor,
                keyword
            }
        };

        rp(options)
            .then(function (res) {
                console.dir(res);
                cb(null, res);
            })
            .catch(function (err) {
                cb(err);
            });
    }

    function getRandomWeightedGenre(genreArray) {
        let weightedGenreArray = [];

        for (let i = 0; i < genreArray.length; i++) {
            let [genreKey, weight] = genreArray[i];
            while (weight > 0) {
                weightedGenreArray.push(GENRES[genreKey]);
                weight--;
            }
        }
        const randomIndex = ~~(Math.random() * weightedGenreArray.length);
        const genre = weightedGenreArray[randomIndex];
        return genre
    }

};
