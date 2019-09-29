import React, { Component } from "react";
import Joi from "joi-browser";
import Home from "./home";
import { getDictionaries } from "../services/dictionaryService";
import loadingGif from "../loader.gif";

class Dictionary extends Component {
  english = React.createRef();
  persian = React.createRef();
  turkish = React.createRef();

  state = {
    data: { id: "", english: "", turkish: "", persian: "" },
    errors: {}
  };
  schema = {
    english: Joi.string()
      .required()
      .min(3),
    turkish: Joi.string(),
    persian: Joi.string()
      .required()
      .min(3)
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const word = { ...this.state.data };
    word[input.name] = input.value;

    this.setState({ word, errors });
  };
  async componentDidMount() {
    const dictionaries = await getDictionaries();
    this.setState({ data: dictionaries.data });
  }
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    // const english = this.english.current.value;
    // const turkish = this.turkish.current.value;
    // const persian = this.persian.current.value;
  };
  render() {
    const { english, turkish, persian } = this.state.data;
    return (
      <React.Fragment>
        <Home />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">English</label>
              <input
                autoFocus
                ref={this.english}
                name="english"
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Please enter word or phrase..."
              />
              {this.state.errors.english && (
                <div className="alert alert-danger">
                  {this.state.errors.english}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Turkce</label>
              <input
                ref={this.turkish}
                name="turkish"
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="sozcuklerinizi buraya girin..."
              />
              {this.state.errors.turkish && (
                <div className="alert alert-danger">
                  {this.state.errors.turkish}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Persian</label>
              <input
                ref={this.persian}
                name="persian"
                onChange={this.handleChange}
                type="text"
                dir="rtl"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="لطفا معادل کلمه یا عبارت وارد شده را وارد نمایید"
              />
              {this.state.errors.persian && (
                <div className="alert alert-danger">
                  {this.state.errors.persian}
                </div>
              )}
            </div>
            <button
              disabled={this.validate()}
              className="btn btn-info form-control mb-3"
            >
              save
            </button>
          </form>

          <div>
            {this.state.loading && <img alt="loader" src={loadingGif} />}
          </div>

          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>English</th>
                <th>Turkce</th>
                <th>Persian</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <th>EN</th>
                <th>T</th>
                <th>P</th>
              </tr>
              <tr>
                <th>2</th>
                <th>EN</th>
                <th>T</th>
                <th>P</th>
              </tr>
              <tr>
                <th>3</th>
                <th>EN</th>
                <th>T</th>
                <th>P</th>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Dictionary;
