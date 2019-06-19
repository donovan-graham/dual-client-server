import React from 'react';
import { Field } from 'formik';
import pick from 'lodash/pick';

const FIELD_NAME_OPTIONS = 'type';
const FIELD_VALUE_OPTIONS_INVESTOR = 'investor';
const FIELD_VALUE_OPTIONS_ADVISER = 'adviser';
const FIELD_VALUE_OPTIONS_ADMIN = 'admin';

const initialValues = { [FIELD_NAME_OPTIONS]: FIELD_VALUE_OPTIONS_INVESTOR };
const collectValues = values => pick(values, [FIELD_NAME_OPTIONS]);
const validate = () => {};

const RadioOption = ({ field: { name, value, onChange, onBlur }, option, children, ...props }) => {
  return (
    <label style={{ display: 'block', margin: 0, padding: 0 }}>
      <input
        name={name}
        type="radio"
        value={option}
        checked={option === value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {children}
    </label>
  );
};

const Component = () => (
  <fieldset>
    <legend>What option?</legend>
    <Field component={RadioOption} option={FIELD_VALUE_OPTIONS_INVESTOR} name={FIELD_NAME_OPTIONS}>
      Investor
    </Field>
    <Field component={RadioOption} option={FIELD_VALUE_OPTIONS_ADVISER} name={FIELD_NAME_OPTIONS}>
      Adviser
    </Field>
    <Field component={RadioOption} option={FIELD_VALUE_OPTIONS_ADMIN} name={FIELD_NAME_OPTIONS}>
      Administrator
    </Field>
  </fieldset>
);

export { FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_INVESTOR, FIELD_VALUE_OPTIONS_ADVISER, FIELD_VALUE_OPTIONS_ADMIN };

export default {
  Component,
  initialValues,
  collectValues,
  validate
};
