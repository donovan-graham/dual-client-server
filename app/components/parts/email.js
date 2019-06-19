import React from 'react';
import { Field, ErrorMessage } from 'formik';
import pick from 'lodash/pick';

const FIELD_NAME_EMAIL = 'email';

const initialValues = { [FIELD_NAME_EMAIL]: '' };
const collectValues = values => pick(values, [FIELD_NAME_EMAIL]);

const validate = values => {
  let errors = {};
  if (!values[FIELD_NAME_EMAIL]) {
    errors[FIELD_NAME_EMAIL] = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[FIELD_NAME_EMAIL])) {
    errors[FIELD_NAME_EMAIL] = 'Invalid email address';
  }
  return errors;
};

const Component = () => (
  <div>
    <label>
      Email:
      <Field type="email" name={FIELD_NAME_EMAIL} />
    </label>
    <ErrorMessage name={FIELD_NAME_EMAIL} component="div" />
  </div>
);

export { FIELD_NAME_EMAIL };

export default {
  Component,
  initialValues,
  collectValues,
  validate
};
