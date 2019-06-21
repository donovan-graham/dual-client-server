import React from 'react';
import { FormikConsumer } from 'formik';
import pick from 'lodash/pick';

import { FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_INVESTOR } from './options';
import Field from './field';

const FIELD_NAME_PASSWORD = 'password';

const isActive = values => values[FIELD_NAME_OPTIONS] === FIELD_VALUE_OPTIONS_INVESTOR;

const initialValues = { [FIELD_NAME_PASSWORD]: '' };
const collectValues = values => (isActive(values) ? pick(values, [FIELD_NAME_PASSWORD]) : {});

const validate = values => {
  let errors = {};
  if (!isActive(values)) return errors;

  if (!values[FIELD_NAME_PASSWORD]) {
    errors[FIELD_NAME_PASSWORD] = 'Required';
  } else if (values[FIELD_NAME_PASSWORD].length <= 4) {
    errors[FIELD_NAME_PASSWORD] = 'Must have at least 5 characters';
  }
  return errors;
};

const Component = () => (
  <FormikConsumer>
    {({ values }) =>
      isActive(values) ? (
        <Field type="password" name={FIELD_NAME_PASSWORD} label="Password" placeholder="Enter your password" />
      ) : null
    }
  </FormikConsumer>
);

export { FIELD_NAME_PASSWORD };

export default {
  Component,
  initialValues,
  collectValues,
  validate
};
