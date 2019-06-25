import React from 'react';
import styled from 'styled-components';
import { useFormikContext, getIn } from 'formik';

export const SFieldSet = styled.fieldset`
  border: 0;
  padding: 0;
`;

export const SLegend = styled.legend`
  font-size: 14px;
  color: #444;
  padding: 6px 2px;
`;

export const SLabel = styled.label`
  font-size: 14px;
  color: #444;
  padding: 6px 2px;
`;

export const SRadioLabel = styled(SLabel)`
  input[type='radio'] {
    margin-right: 5px;
  }
`;

export const STick = styled.strong`
  font-size: 12px;
  color: green;
  margin-right: 6px;
`;

export const SCross = styled.strong`
  font-size: 12px;
  color: red;
  margin-right: 6px;
`;

export const SError = styled.div`
  font-size: 12px;
  color: red;
  padding: 4px 8px 6px 8px;
`;

export const SInput = styled.input`
  border: 1px solid #efefef;
  padding: 8px;
  font-size: 16px;
  color: #222;
  max-width: 340px;
  outline: none;

  &:focus {
    background-color: #e7f0fe;
    border: 1px solid lightsteelblue;
  }

  &:placeholder {
    font-size: 12px;
    margin-top: -4px;
    vertical-align: top;
  }
`;

export const SShortInput = styled(SInput)`
  max-width: 160px;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RadioGroup = ({ options, id, name, isInitialValid = true, label }) => {
  const { touched, errors, values, handleChange, handleBlur } = useFormikContext();

  const fieldId = id || name;
  const value = getIn(values, name);
  const showError = getIn(touched, name) || isInitialValid;
  const error = showError ? getIn(errors, name) : null;
  const hasError = !!error;
  const ariaErrorId = `${fieldId}_error`;

  return (
    <SFieldSet>
      <SLegend>
        {showError ? hasError ? <SCross>×</SCross> : <STick>✓</STick> : null}
        {label}
      </SLegend>
      {hasError ? (
        <SError id={ariaErrorId} role="alert">
          ↪ {error}
        </SError>
      ) : null}

      <FlexRow>
        {options.map(([optValue, optLabel], i) => (
          <SRadioLabel key={i}>
            <input
              type="radio"
              name={name}
              value={optValue}
              checked={optValue === value}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {optLabel}
          </SRadioLabel>
        ))}
      </FlexRow>
    </SFieldSet>
  );
};

const Field = ({ id, name, label, type = 'text', required = true, ...props }) => {
  const { touched, errors, values, handleChange, handleBlur } = useFormikContext();

  const fieldId = id || name;
  const value = getIn(values, name);
  const hasTouch = getIn(touched, name);
  const error = hasTouch ? getIn(errors, name) : null;
  const hasError = !!error;
  const ariaErrorId = `${fieldId}_error`;

  return (
    <FlexColumn>
      <SLabel htmlFor={fieldId}>
        {hasTouch ? hasError ? <SCross>×</SCross> : <STick>✓</STick> : null}
        {label}:
      </SLabel>

      <SInput
        {...props}
        id={fieldId}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={ariaErrorId}
      />

      {hasError ? (
        <SError id={ariaErrorId} role="alert">
          ↪ {error}
        </SError>
      ) : null}
    </FlexColumn>
  );
};

export default Field;
