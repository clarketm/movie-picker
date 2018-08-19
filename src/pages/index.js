import React, { Component } from "react";
import { callApi, GENRES, IMDB, PROFILES, RT } from "../utils";
import ReactLoading from "react-loading";

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "default",
      custom: false,
      genre: -1,
      movie: true,
      show: false,
      minimum_imdb: 9,
      minimum_rt: 90,
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
      // genre
      if (this.state.genre !== "all") {
        params.append("genre", this.state.genre);
      }

      // content_kind
      if (this.state.movie && this.state.show) {
        params.append("content_kind", "both");
      } else if (this.state.movie) {
        params.append("content_kind", "movie");
      } else if (this.state.show) {
        params.append("content_kind", "show");
      }

      // minimum_imdb
      if (this.state.minimum_imdb !== -1) {
        params.append("minimum_imdb", this.state.minimum_imdb);
      }

      // minimum_rt
      if (this.state.minimum_imdb !== -1) {
        params.append("minimum_rt", this.state.minimum_rt);
      }
    }

    console.log(params.toString());

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

    if (
      target.type === "checkbox" &&
      this.state.movie !== this.state.show &&
      value === false
    ) {
      // Ensure at least one "content_kind" is selected!
      return;
    }

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
              <label for="movie">Customize pick?</label>
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
                    {GENRES.map(({ id, name, slug }, index) => (
                      <option key={id} value={slug}>
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
