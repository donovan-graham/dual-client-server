import React from 'react';
import pick from 'lodash/pick';

import { RadioGroup } from './field';

const FIELD_NAME_OPTIONS = 'type';
const FIELD_VALUE_OPTIONS_INVESTOR = 'investor';
const FIELD_VALUE_OPTIONS_ADVISER = 'adviser';
const FIELD_VALUE_OPTIONS_ADMIN = 'admin';

const initialValues = { [FIELD_NAME_OPTIONS]: FIELD_VALUE_OPTIONS_INVESTOR };
const collectValues = values => pick(values, [FIELD_NAME_OPTIONS]);
const validate = values => {
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

export { FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_INVESTOR, FIELD_VALUE_OPTIONS_ADVISER, FIELD_VALUE_OPTIONS_ADMIN };

export default {
  Component,
  initialValues,
  collectValues,
  validate
};
