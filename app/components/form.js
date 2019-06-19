import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import merge from 'lodash/merge';

import Options, {
  FIELD_NAME_OPTIONS,
  FIELD_VALUE_OPTIONS_ADVISER,
  FIELD_VALUE_OPTIONS_INVESTOR
} from './parts/options';
import Email from './parts/email';
import Password from './parts/password';
import Pin from './parts/pin';

const forms = [Options, Email, Password, Pin];

const initialValues = merge({}, ...forms.map(f => f.initialValues));

const validators = forms.map(f => f.validate);
const validation = values => merge({}, ...validators.map(v => v(values)));

const collectors = forms.map(f => f.collectValues);
const collection = values => merge({}, ...collectors.map(c => c(values)));

const handleSubmit = (values, { setSubmitting }) =>
  setTimeout(() => {
    alert(JSON.stringify(collection(values), null, 2));
    setSubmitting(false);
  }, 400);

const Basic = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik initialValues={initialValues} validate={validation} onSubmit={handleSubmit}>
      {({ isSubmitting, handleReset, setFieldValue, values, errors }) => (
        <Form>
          <Options.Component />
          <br />
          <Email.Component />
          <br />
          <Password.Component />
          <Pin.Component />
          <br />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button
            type="button"
            onClick={() =>
              values[FIELD_NAME_OPTIONS] === FIELD_VALUE_OPTIONS_INVESTOR
                ? setFieldValue(FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_ADVISER)
                : setFieldValue(FIELD_NAME_OPTIONS, FIELD_VALUE_OPTIONS_INVESTOR)
            }
          >
            Change user
          </button>

          <hr />
          <strong>Values</strong>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <strong>Errors</strong>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  </div>
);

export default Basic;
