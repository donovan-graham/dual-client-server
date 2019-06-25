import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import pick from 'lodash/pick';

import { FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_INVESTOR } from './options';
import Field from './field';

const Eye = styled.div`
  display: inline-block;
  position: relative;
  &:before {
    content: '👁';
    display: inline-block;
  }
`;
const EyeClosed = styled(Eye)`
  &:after {
    content: '|';
    color: #333;
    transform: rotate(-45deg);
    display: block;
    position: absolute;
    top: -5px;
    left: 7px;
    font-size: 29px;
  }
`;

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
  const [redact, setRedacted] = useState(true);
  return (
    <Field type={redact ? 'password' : 'text'} name={FIELD_NAME_PASSWORD} placeholder="Enter your password">
      Password <a onClick={() => setRedacted(!redact)}>{redact ? <Eye /> : <EyeClosed />}</a>
    </Field>
  );
};

export default {
  Component,
  initialValues,
  collectValues: values => (isActive(values) ? collectValues(values) : {}),
  validate: values => (isActive(values) ? validate(values) : {})
};
