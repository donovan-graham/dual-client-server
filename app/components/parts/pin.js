import React from 'react';
import { useFormikContext } from 'formik';
import pick from 'lodash/pick';

import Field from './field';
import { FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_ADVISER } from './options';

const FIELD_NAME_PIN = 'pin';

const initialValues = { [FIELD_NAME_PIN]: '' };
const isActive = values => values[FIELD_NAME_OPTIONS] == FIELD_VALUE_OPTIONS_ADVISER;
const collectValues = values => pick(values, [FIELD_NAME_PIN]);
const validate = values => {
  let errors = {};
  if (!values[FIELD_NAME_PIN]) {
    errors[FIELD_NAME_PIN] = 'Required';
  } else if (values[FIELD_NAME_PIN].length !== 6) {
    errors[FIELD_NAME_PIN] = 'Must have 6 characters';
  }
  return errors;
};

const Component = () => {
  const { values } = useFormikContext();
  if (!isActive(values)) return null;

  return <Field type="text" name={FIELD_NAME_PIN} label="Secure Pin Number" placeholder="Enter 6 digit pin" />;
};

export { FIELD_NAME_PIN };

export default {
  Component,
  initialValues,
  collectValues: values => (isActive(values) ? collectValues(values) : {}),
  validate: values => (isActive(values) ? validate(values) : {})
};
