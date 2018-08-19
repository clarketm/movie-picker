import React, { Component } from "react";
import { callApi, callIMDBApi, callRTApi, createIMDBUrl, GENRES, IMDB, PROFILES, RT } from "../utils";
import ReactLoading from "react-loading";

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "default",
      custom: false,
      genre: 0, // "All Genres"
      movie: true,
      show: false,
      minimum_imdb: 9, // "> 9"
      minimum_rt: 90, // " > 90%"
      isLoading: false,
      _Recommendation: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ _Recommendation: this.Recommendation });
  }

  setLoading(status) {
    this.setState({ isLoading: status });
    this.state._Recommendation.setState({ isLoading: status });
  }

  handleSubmit(event) {
    event.preventDefault();
    let body = {};
    let content_kind;

    if (!this.state.custom) {
      body.profile = this.state.profile;
    } else {
      // genre
      if (this.state.genre !== 0) {
        body.genre = Number(this.state.genre);
      }

      // content_kind
      if (this.state.movie && this.state.show) {
        content_kind = "both";
      } else if (this.state.movie) {
        content_kind = "movie";
      } else if (this.state.show) {
        content_kind = "show";
      }
      body.content_kind = content_kind;

      // minimum_imdb
      if (this.state.minimum_imdb !== 0) {
        body.minimum_imdb = Number(this.state.minimum_imdb);
      }

      // minimum_rt
      if (this.state.minimum_imdb !== 0) {
        body.minimum_rt = Number(this.state.minimum_rt);
      }
    }

    this.setLoading(true);

    return callApi(body).then(response => {
      console.log(response);

      // API response
      // {
      //   "id": "7f8f07f3-41a6-4aa3-8b6e-c456766d0e70",
      //   "slug": "railroad-tigers-2016",
      //   "title": "Railroad Tigers",
      //   "overview": "A railroad worker in China in 1941 leads a team of freedom fighters against the Japanese in order to get food for the poor.",
      //   "tagline": "Roaring soon",
      //   "classification": null,
      //   "runtime": 124,
      //   "released_on": "2016-12-23T00:00:00",
      //   "has_poster": true,
      //   "has_backdrop": true,
      //   "imdb_rating": 5.9,
      //   "rt_critics_rating": 39,
      //   "genres": [5, 9, 35],
      //   "watchlisted": false,
      //   "seen": false,
      //   "content_type": "m"
      // }

      this.state._Recommendation.addContent(response);
      this.setLoading(false);
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if ((name === "movie" || name === "show") && this.state.movie !== this.state.show && value === false) {
      // Ensure at least one "content_kind" is selected!
      return;
    }

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          <form className="container" onSubmit={this.handleSubmit}>
            <div className="row text-right">
              <div className="column">
                <label for="movie">Customize pick?</label>
                <input
                  name="custom"
                  id="custom"
                  onChange={this.handleChange}
                  type="checkbox"
                  value={this.state.custom}
                  checked={this.state.custom}
                />
              </div>
            </div>

            {(this.state.custom && (
              <div>
                <div className="row">
                  <div className="column">
                    <label for="genre">Genre</label>
                    <select name="genre" id="genre" onChange={this.handleChange} value={this.state.genre}>
                      {Object.entries(GENRES).map(([id, { slug, name }], index) => (
                        <option key={slug} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="column">
                    <label for="movie">Movies?</label>
                    <input
                      name="movie"
                      id="movie"
                      onChange={this.handleChange}
                      type="checkbox"
                      value={this.state.movie}
                      checked={this.state.movie}
                    />
                    <br />
                  </div>

                  <div className="column">
                    <label for="show">TV Shows?</label>
                    <input
                      name="show"
                      id="show"
                      onChange={this.handleChange}
                      type="checkbox"
                      value={this.state.show}
                      checked={this.state.show}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="column">
                    <label for="imdb">IMDB</label>
                    <select
                      name="minimum_imdb"
                      id="minimum_imdb"
                      onChange={this.handleChange}
                      value={this.state.minimum_imdb}
                    >
                      {IMDB.map(({ id, name }, index) => (
                        <option key={name} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="column">
                    <label for="rt">Rotten Tomatoes</label>
                    <select
                      name="minimum_rt"
                      id="minimum_rt"
                      onChange={this.handleChange}
                      value={this.state.minimum_rt}
                    >
                      {RT.map(({ id, name }, index) => (
                        <option key={name} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )) || (
              <div className="row">
                <div className="column">
                  <label for="profile">Profile</label>
                  <select name="profile" id="profile" onChange={this.handleChange} value={this.state.profile}>
                    {Object.keys(PROFILES).map((key, index) => (
                      <option key={key} value={PROFILES[key]}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="text-right">
              <button type="submit" className="button" disabled={this.state.isLoading}>
                Search
              </button>
            </div>
          </form>
        </div>
        <br className="mobile-only" />
        <div className="column text-center">
          <Recommendation ref={ref => (this.Recommendation = ref)} />
        </div>
      </div>
    );
  }
}

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      rtUrl: "",
      imdbUrl: "",
      result: {}
    };
  }

  fetchRottenTomatoes = title => {
    return callRTApi(title).then(response => {
      if (response.movies.length) {
        this.setState({
          rtUrl: response.movies[0].url
        });
      }
    });
  };

  addContent(result) {
    this.fetchRottenTomatoes(result.title);
    this.setState({
      result,
      imdbUrl: createIMDBUrl(result.title)
    });
  }

  render() {
    const { result, isLoading, rtUrl, imdbUrl } = this.state;
    const { id, rt_critics_rating, title, released_on, imdb_rating, season_count, overview, slug, genres } = result;
    const contentKind = Boolean(season_count) ? "show" : "movie";

    return (
      <section>
        {(isLoading && (
          <section className="text-center">
            <ReactLoading className="block-center" type="bars" color="#1d6dcd" height="15rem" width="15rem" delay="0" />
          </section>
        )) || (
          <section>
            {id && (
              <div className="row">
                <div className="column text-right mobile-center">
                  <img
                    className="thumbnail"
                    src={`https://img.reelgood.com/content/${contentKind}/${id}/poster-780.jpg`}
                  />
                </div>
                <div className="column">
                  <h4>{title}</h4>
                  <p>
                    <span>
                      {new Date(released_on).getFullYear()}
                      &nbsp; &nbsp;
                    </span>
                    <span>
                      <span style={{ fontWeight: 400 }}>
                        {(imdbUrl && (
                          <a target="_blank" href={imdbUrl}>
                            IMDB:&nbsp;
                          </a>
                        )) || <span>IMDB: </span>}
                      </span>
                      {`${imdb_rating}/10`}
                      &nbsp; &nbsp;
                    </span>
                    {rt_critics_rating && (
                      <span>
                        <span style={{ fontWeight: 400 }}>
                          {(rtUrl && (
                            <a target="_blank" href={`https://www.rottentomatoes.com${rtUrl}`}>
                              RT:&nbsp;
                            </a>
                          )) || <span>RT: </span>}
                        </span>
                        {`${rt_critics_rating}%`}
                        &nbsp; &nbsp;
                      </span>
                    )}
                    {season_count && (
                      <span>
                        {`${season_count} Seasons`}
                        &nbsp;
                      </span>
                    )}
                  </p>
                  <p style={{ fontSize: "0.8em" }}>{genres.map(genre => GENRES[genre].name).join(", ")}</p>
                  <p style={{ fontSize: "0.8em" }}>{overview}</p>
                  {/* TODO: genres */}
                  {/* TODO: watch */}
                  <a className="button" target="_blank" href={`https://reelgood.com/${contentKind}/${slug}`}>
                    More Info
                  </a>
                </div>
              </div>
            )}
          </section>
        )}
      </section>
    );
  }
}

export default IndexPage;
