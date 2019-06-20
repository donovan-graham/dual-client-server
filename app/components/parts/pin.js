import React, { Fragment } from 'react';
import { Field, ErrorMessage, FormikConsumer } from 'formik';
import { FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_ADVISER } from './options';
import pick from 'lodash/pick';
import styled from 'styled-components';

const SFieldRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const SLabel = styled.label`
  font-size: 14px;
  color: #444;
  padding: 6px 2px;
`;

const SInput = styled.input`
  border: 1px solid #efefef;
  padding: 8px;
  font-size: 16px;
  color: #222;
  max-width: 160px;
  &::placeholder {
    font-size: 12px;
    margin-top: -4px;
    vertical-align: top;
  }
`;

const SError = styled.div`
  font-size: 12px;
  color: red;
  padding: 4px 8px 6px 8px;
`;

const STick = styled.strong`
  color: green;
  margin-right: 6px;
`;
const SCross = styled.strong`
  color: red;
  margin-right: 6px;
`;

const FIELD_NAME_PIN = 'pin';

const isActive = values => values[FIELD_NAME_OPTIONS] == FIELD_VALUE_OPTIONS_ADVISER;
const initialValues = { [FIELD_NAME_PIN]: '' };
const collectValues = values => (isActive(values) ? pick(values, [FIELD_NAME_PIN]) : {});

const validate = values => {
  let errors = {};
  if (!isActive(values)) return errors;

  if (!values[FIELD_NAME_PIN]) {
    errors[FIELD_NAME_PIN] = 'Required';
  } else if (values[FIELD_NAME_PIN].length < 6) {
    errors[FIELD_NAME_PIN] = 'Secure pin number too short';
  } else if (values[FIELD_NAME_PIN].length > 6) {
    errors[FIELD_NAME_PIN] = 'Secure pin number too long';
  }
  return errors;
};

const errorId = `${FIELD_NAME_PIN}_error`;

const Component = () => (
  <FormikConsumer>
    {({ values, errors, touched, handleChange, handleBlur }) =>
      isActive(values) ? (
        <SFieldRow>
          <SLabel htmlFor={FIELD_NAME_PIN}>
            {touched[FIELD_NAME_PIN] ? errors[FIELD_NAME_PIN] ? <SCross>×</SCross> : <STick>✓</STick> : null}
            Secure Pin Number ({values[FIELD_NAME_PIN].length}/6):
          </SLabel>
          <SInput
            placeholder="Enter 6 digit pin  "
            type="password"
            id={FIELD_NAME_PIN}
            name={FIELD_NAME_PIN}
            value={values[FIELD_NAME_PIN]}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={6}
            aria-required={true}
            aria-invalid={!!errors[FIELD_NAME_PIN]}
            aria-describedby={errorId}
          />

          {errors[FIELD_NAME_PIN] && touched[FIELD_NAME_PIN] ? (
            <SError id={errorId} role="alert">
              ↪ {errors[FIELD_NAME_PIN]}
            </SError>
          ) : null}
        </SFieldRow>
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
