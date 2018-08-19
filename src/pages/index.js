import React, { Component } from "react";
import { callApi, GENRES, PROFILES, RATINGS } from "../utils";
import ReactLoading from "react-loading";

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "default",
      custom: false,
      genre: "all",
      movies: true,
      tv: false,
      lowrating: "1.0",
      highrating: "5.0",
      director: "",
      actor: "",
      keyword: "",
      isLoading: false,
      _Recommendation: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { Recommendation } = this.refs;
    this.setState({ _Recommendation: Recommendation });
  }

  setLoading(status) {
    this.setState({ isLoading: status });
    this.state._Recommendation.setState({ isLoading: status });
  }

  handleSubmit(event) {
    event.preventDefault();
    let params = new URLSearchParams();

    if (!this.state.custom) {
      params.append("profile", this.state.profile);
    } else {
      params.append("genre", this.state.genre);
      params.append("movies", this.state.movies);
      params.append("tv", this.state.tv);
      params.append("lowrating", this.state.lowrating);
      params.append("highrating", this.state.highrating);
      params.append("director", this.state.director);
      params.append("actor", this.state.actor);
      params.append("keyword", this.state.keyword);
    }

    this.setLoading(true);
    Promise.resolve(callApi(params)).then(result => {
      console.log(result);
      this.state._Recommendation.addContent(result);
      this.setLoading(false);
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <main>
        <form className="container" onSubmit={this.handleSubmit}>
          <div className="row text-right">
            <div className="column">
              <label for="movies">Customize pick?</label>
              <input
                name="custom"
                id="custom"
                onChange={this.handleChange}
                type="checkbox"
                value={this.state.custom}
              />
            </div>
          </div>

          {(this.state.custom && (
            <div>
              <div className="row">
                <div className="column">
                  <label for="genre">Genre</label>
                  <select
                    name="genre"
                    id="genre"
                    onChange={this.handleChange}
                    value={this.state.genre}
                  >
                    {Object.keys(GENRES).map((key, index) => (
                      <option key={key} value={GENRES[key]}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="column">
                  <label for="movies">Movies?</label>
                  <input
                    name="movies"
                    id="movies"
                    onChange={this.handleChange}
                    type="checkbox"
                    value={this.state.movies}
                  />
                  <br />
                </div>

                <div className="column">
                  <label for="movies">TV Shows?</label>
                  <input
                    name="tv"
                    id="tv"
                    onChange={this.handleChange}
                    type="checkbox"
                    value={this.state.tv}
                  />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <label for="lowrating">Lowest rating</label>
                  <select
                    name="lowrating"
                    id="lowrating"
                    onChange={this.handleChange}
                    value={this.state.lowrating}
                  >
                    {RATINGS.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="column">
                  <label for="highrating">Highest rating</label>
                  <select
                    name="highrating"
                    id="highrating"
                    onChange={this.handleChange}
                    value={this.state.highrating}
                  >
                    {RATINGS.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <label for="director">Director</label>
                  <input
                    name="director"
                    id="director"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.director}
                  />
                </div>

                <div className="column">
                  <label for="actor">Actor</label>
                  <input
                    name="actor"
                    id="actor"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.actor}
                  />
                </div>

                <div className="column">
                  <label for="keyword">Keyword</label>
                  <input
                    name="keyword"
                    id="keyword"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.keyword}
                  />
                </div>
              </div>
            </div>
          )) || (
            <div className="row">
              <div className="column">
                <label for="profile">Profile</label>
                <select
                  name="profile"
                  id="profile"
                  onChange={this.handleChange}
                  value={this.state.profile}
                >
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
            <button
              type="submit"
              className="button"
              disabled={this.state.isLoading}
            >
              Search
            </button>
          </div>
        </form>
        <hr />
        <Recommendation ref="Recommendation" />
      </main>
    );
  }
}

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      content: null
    };
  }

  addContent(content) {
    this.setState({
      content
    });
  }

  render() {
    return (
      <section>
        {(this.state.isLoading && (
          <section className="text-center">
            <ReactLoading
              className="block-center"
              type="bars"
              color="#1d6dcd"
              height="15rem"
              width="15rem"
              delay="0"
            />
          </section>
        )) || (
          <section>
            <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
          </section>
        )}
      </section>
    );
  }
}

export default IndexPage;
