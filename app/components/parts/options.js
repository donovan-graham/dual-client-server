import React from 'react';
import pick from 'lodash/pick';

import { RadioGroup } from './field';

export const FIELD_NAME_OPTIONS = 'type';
export const FIELD_VALUE_OPTIONS_INVESTOR = 'investor';
export const FIELD_VALUE_OPTIONS_ADVISER = 'adviser';
export const FIELD_VALUE_OPTIONS_ADMIN = 'admin';

export const initialValues = { [FIELD_NAME_OPTIONS]: FIELD_VALUE_OPTIONS_INVESTOR };
export const collectValues = values => pick(values, [FIELD_NAME_OPTIONS]);
export const validate = values => {
  let errors = {};
  if (!values[FIELD_NAME_OPTIONS]) {
    errors[FIELD_NAME_OPTIONS] = 'Required';
  }
  return errors;
};

const options = [
  [FIELD_VALUE_OPTIONS_INVESTOR, 'Investor'],
  [FIELD_VALUE_OPTIONS_ADVISER, 'Adviser'],
  [FIELD_VALUE_OPTIONS_ADMIN, 'Administrator']
];

const Component = () => <RadioGroup options={options} name={FIELD_NAME_OPTIONS} label="What option?" />;

export default {
  Component,
  initialValues,
  collectValues,
  validate
};
