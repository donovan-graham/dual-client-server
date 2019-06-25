import React from 'react';
import { useFormikContext } from 'formik';
import pick from 'lodash/pick';

import { FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_INVESTOR } from './options';
import Field from './field';

export const FIELD_NAME_PASSWORD = 'password';

export const initialValues = { [FIELD_NAME_PASSWORD]: '' };
export const isActive = values => values[FIELD_NAME_OPTIONS] === FIELD_VALUE_OPTIONS_INVESTOR;
export const collectValues = values => pick(values, [FIELD_NAME_PASSWORD]);
export const validate = values => {
  let errors = {};
  if (!values[FIELD_NAME_PASSWORD]) {
    errors[FIELD_NAME_PASSWORD] = 'Required';
  } else if (values[FIELD_NAME_PASSWORD].length <= 4) {
    errors[FIELD_NAME_PASSWORD] = 'Must have at least 5 characters';
  }
  return errors;
};

const Component = () => {
  const { values } = useFormikContext();
  if (!isActive(values)) return null;

  return <Field type="password" name={FIELD_NAME_PASSWORD} label="Password" placeholder="Enter your password" />;
};

export default {
  Component,
  initialValues,
  collectValues: values => (isActive(values) ? collectValues(values) : {}),
  validate: values => (isActive(values) ? validate(values) : {})
};
