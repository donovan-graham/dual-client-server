import React from 'react';
import { FormikConsumer } from 'formik';
import pick from 'lodash/pick';

import Field from './field';
import { FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_ADVISER } from './options';

const FIELD_NAME_PIN = 'pin';

const isActive = values => values[FIELD_NAME_OPTIONS] == FIELD_VALUE_OPTIONS_ADVISER;
const initialValues = { [FIELD_NAME_PIN]: '' };
const collectValues = values => (isActive(values) ? pick(values, [FIELD_NAME_PIN]) : {});

const validate = values => {
  let errors = {};
  if (!isActive(values)) return errors;

  if (!values[FIELD_NAME_PIN]) {
    errors[FIELD_NAME_PIN] = 'Required';
  } else if (values[FIELD_NAME_PIN].length !== 6) {
    errors[FIELD_NAME_PIN] = 'Must have 6 characters';
  }
  return errors;
};

const Component = () => (
  <FormikConsumer>
    {({ values }) =>
      isActive(values) ? (
        <Field type="text" name={FIELD_NAME_PIN} label="Secure Pin Number" placeholder="Enter 6 digit pin" />
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
