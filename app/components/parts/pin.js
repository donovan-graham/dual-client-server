import React from 'react';
import { Field, ErrorMessage, FormikConsumer } from 'formik';
import { FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_ADVISER } from './options';
import pick from 'lodash/pick';

const FIELD_NAME_PIN = 'pin';

const isActive = values => values[FIELD_NAME_OPTIONS] == FIELD_VALUE_OPTIONS_ADVISER;
const initialValues = { [FIELD_NAME_PIN]: '' };
const collectValues = values => (isActive(values) ? pick(values, [FIELD_NAME_PIN]) : {});

const validate = values => {
  let errors = {};
  if (!isActive(values)) return errors;

  if (!values[FIELD_NAME_PIN]) {
    errors[FIELD_NAME_PIN] = 'Required';
  } else if (values[FIELD_NAME_PIN].length <= 4) {
    errors[FIELD_NAME_PIN] = 'Secure pin number too short';
  }
  return errors;
};

const Component = () => (
  <FormikConsumer>
    {({ values }) =>
      isActive(values) ? (
        <div>
          <label>
            Secure Pin Number:
            <Field type="password" name={FIELD_NAME_PIN} />
          </label>
          <ErrorMessage name={FIELD_NAME_PIN} component="div" />
        </div>
      ) : null
    }
  </FormikConsumer>
);

export { FIELD_NAME_PIN };

export default {
  Component,
  initialValues,
  collectValues,
  validate
};
