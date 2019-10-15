import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { postDictionary } from "../services/dictionaryService";
import { toast } from "react-toastify";

class DictionaryForm extends Form {
  state = {
    data: { english: "", turkish: "", persian: "" },
    errors: {}
  };
  schema = {
    english: Joi.string()
      .required()
      .min(3),
    turkish: Joi.string().required(),
    persian: Joi.string()
      .required()
      .min(3)
  };
  doSubmit = () => {
    //call the server

    const originalData = { ...this.state.data };
    postDictionary(originalData);
    toast.success("اطلاعات وارد شده با موفقیت ثبت گردید");
    const data = { english: "", turkish: "", persian: "" };
    this.setState({ data });
  };

  render() {
    return (
      <div className="card border-primary my-3">
        <div className="card-header">Input form</div>
        <form className="container" onSubmit={this.handleSubmit}>
          {this.renderInput(
            "english",
            "English",
            "please enter the word",
            true
          )}
          {this.renderInput(
            "turkish",
            "Turkish",
            "lufen sozcuyun anlamini girin"
          )}
          {this.renderInput(
            "persian",
            "Persian",
            "لطفا ترجمه کلمه مورد نظر را وارد نمایید",
            false,
            "rtl"
          )}
          {this.renderButton("save")}
          <div className="my-5"></div>
        </form>
      </div>
    );
  }
}

export default DictionaryForm;
