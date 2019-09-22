import React from "react";
import Select from "react-select";
import "./styles.scss";

export default class Container extends React.PureComponent<> {
  state = {
    title: null,
    genre: null,
    genres: [],
    manuscript: null,
    synopsis: null,
    cover: null
  };

  handleAdd = () => {
    this.props.handleAdd(this.state);
  };

  render() {
    return (
      <div class="card">
        <div class="card-body">
          <div className="row" style={{ margin: 15 }}>
            <div className="col-sm-6">
              <div class="md-form" class="mb-5">
                <input
                  placeholder="Title"
                  onChange={event =>
                    this.setState({ title: event.target.value })
                  }
                  value={this.state.title}
                  type="text"
                  id="field"
                  class="form-control"
                />
                {/*
                                    <label class={this.state.title && 'active'} for="field">Title</label>
                                    */}
              </div>
              <div class="md-form" class="mb-5">
                {/*
                                    <input onChange={(event) => this.setState({genre: event.target.value})} value={this.state.genre} type="text" id="field" class="form-control"/>
                                    <label class={this.state.genre && 'active'} for="field">Genre</label>
                                    */}
                <Select
                  placeholder="Genres"
                  isMulti
                  onChange={value =>
                    this.setState({
                      genres: value ? value.map(val => val.value) : []
                    })
                  }
                  options={[
                    { value: "chocolate", label: "Chocolate" },
                    { value: "strawberry", label: "Strawberry" },
                    { value: "vanilla", label: "Vanilla" }
                  ]}
                  options={this.props.genres.map(genre => ({
                    value: genre.name,
                    label: genre.name
                  }))}
                />
              </div>
              <div class="md-form" class="mb-5">
                {/*
                                        <label class={this.state.synopsis && 'active'} for="field">Short Summary</label>
                                    */}
                <textarea
                  placeholder="Synopsis"
                  value={this.state.synopsis}
                  onChange={event =>
                    this.setState({ synopsis: event.target.value })
                  }
                  id="field"
                  class="md-textarea form-control"
                  rows="2"
                ></textarea>
              </div>
            </div>
            <div className="col-sm-6">
              <div class="md-form" class="md-form mb-5">
                <input
                  style={{ borderColor: "transparent" }}
                  onChange={event =>
                    this.setState({ manuscript: event.target.files })
                  }
                  type="file"
                  id="field"
                  class="form-control"
                  accept="application/pdf, text/plain,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <label class={"active"} for="field">
                  Manuscript File
                </label>
              </div>
              <div class="md-form" class="md-form mb-5">
                <input
                  style={{ borderColor: "transparent" }}
                  onChange={event =>
                    this.setState({ cover: event.target.files })
                  }
                  type="file"
                  id="field"
                  class="form-control"
                  accept="image/jpg, image/jpg, image/png,"
                />
                <label class={"active"} for="field">
                  Proposed Cover
                </label>
              </div>
              <button
                type="button"
                onClick={this.props.cancel}
                className="btn btn-danger"
              >
                Cancel
              </button>
              {"      "}
              <button
                type="button"
                className="btn btn-success"
                onClick={this.handleAdd}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div className="manuscript-form-wrapper">
        <div className="row">
          <div className="col-sm-6">
            <h5>Title</h5>
            <input
              className="form-control"
              placeholder="title"
              onChange={event => this.setState({ title: event.target.value })}
              value={this.state.title}
              type="text"
            />
            <h5>Genre</h5>
            <input
              className="form-control"
              placeholder="genre"
              onChange={event => this.setState({ genre: event.target.value })}
              value={this.state.genre}
              type="text"
            />
            <h5>Synopsis</h5>
            <textarea
              className="form-control"
              placeholder="synopsis"
              onChange={event =>
                this.setState({ synopsis: event.target.value })
              }
              value={this.state.synopsis}
              type="text"
              rows="3"
            ></textarea>
          </div>
          <div className="col-sm-6">
            <h5>Manuscript</h5>
            <input
              className="form-control"
              placeholder="manuscript"
              onChange={event =>
                this.setState({ manuscript: event.target.files })
              }
              type="file"
            />

            <h5>Cover</h5>
            <input
              className="form-control"
              placeholder="cover"
              onChange={event => this.setState({ cover: event.target.files })}
              type="file"
              accept="image/jpg, image/jpg, image/png,"
            />

            <br />
            <br />
            <button
              type="button"
              onClick={this.props.cancel}
              className="btn btn-danger"
            >
              Cancel
            </button>
            {"      "}
            <button
              type="button"
              className="btn btn-success"
              onClick={this.handleAdd}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
