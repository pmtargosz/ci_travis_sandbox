// BlogForm shows a form for a user to add input
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import BlogField from "./BlogField";
import formFields from "./formFields";

class BlogForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }) => (
      <Field
        key={name}
        component={BlogField}
        type="text"
        label={label}
        name={name}
      />
    ));
  }

  render() {
    const { handleSubmit, onBlogSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(onBlogSubmit)}>
          {this.renderFields()}
          <Link to="/blogs" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  formFields.map(({ name }) =>
    !values[name] ? (errors[name] = "You must provide a value") : null
  );

  return errors;
}

export default reduxForm({
  validate,
  form: "blogForm",
  destroyOnUnmount: false
})(BlogForm);
