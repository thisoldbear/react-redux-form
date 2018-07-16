import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect} from 'react-redux';

import { postForm } from '../store/actions';

const validate = values => {
  const errors = {};

  if (!values.daniel) {
    errors.daniel = {};
    errors.daniel.text = 'Enter a value';
  }

  if (!values.colin) {
    errors.colin = {};
    errors.colin.text = 'Enter value';
  }

  if (values.colin && values.colin.length > 5) {
    errors.colin = {};
    errors.colin.text = 'Enter value less than five characters';
  }

  if (!values.oliver) {
    errors.oliver = {};
    errors.oliver.text = 'Enter value';
  }

  return errors;
}

const warn = values => {
  const warnings = {};

  if (!values.david || values.david.length < 3) {
    warnings.david = {};
    warnings.david.text = 'We recommend you enter more than three characters';
  }

  return warnings;
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [
        {
          name: 'david',
          label: 'David'
        },
        {
          name: 'daniel',
          label: 'Daniel'
        },
        {
          name: 'colin',
          label: 'Colin'
        }
      ]
    }
  }

  renderField(field) {
    const { meta: {touched, error, warning} } = field;

    let className = 'form-field';

    if (touched && error) {
      className = `${className} has-error`;
    } else if (touched && warning) {
      className = `${className} has-warning`;
    }

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type="text"
          {...field.input}
        />
        {(touched && error) &&
          <div className="text-help">
            {error.text}
          </div>
        }
        {(touched && warning) &&
          <div className="text-help">
            {warning.text}
          </div>
        }
      </div>
    );
  }

  onSubmit(values) {
    /// Values will only get to the action
    /// if the form is valid
    this.props.postForm(values);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        fields: [...this.state.fields, {
          name: 'oliver',
          label: 'Oliver',
        }]
      })
    }, 5000);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {this.state.fields.map((obj) => {
          return <Field key={obj.name}
            label={obj.label}
            name={obj.name}
            component={this.renderField}
          />
        })}

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'Form',
  validate,
  warn
})(
  connect(null, {postForm})(Form)
);
