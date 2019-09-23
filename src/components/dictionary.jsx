import React, { Component } from "react";
import Joi from "joi-browser";
import Home from "./home";

class Dictionary extends Component {
  state = { word: { english: "", turkish: "", persian: "" }, errors: {} };
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
    const { error } = Joi.validate(this.state.word, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const options = { abortEarly: false };
    const obj = { [name]: value };
    const schema = { [name]: this.schema.name };
    const { errors } = Joi.validate(obj, schema, options);
    return errors ? errors.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const word = { ...this.state.word };
    word[input.name] = input.value;
    this.setState({ word, errors });
  };
  render() {
    return (
      <React.Fragment>
        <Home />
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">English</label>
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Please enter word or phrase..."
              />
              {this.state.errors.english && (
                <div>{this.state.errors.engllish}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Turkce</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="sozcuklerinizi buraya girin..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Persian</label>
              <input
                type="text"
                dir="rtl"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="لطفا معادل کلمه یا عبارت وارد شده را وارد نمایید"
              />
            </div>
            <input
              type="submit"
              value="save"
              className="btn btn-info form-control mb-3"
            />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Dictionary;
