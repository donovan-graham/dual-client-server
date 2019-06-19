import React from 'react';
import { hot } from 'react-hot-loader';
import Counter from './counter';
import Form from './form';

const App = ({ role }) => (
  <div>
    <h1>
      It works for any <strong style={{ color: 'red' }}>{role}</strong>
    </h1>
    <Form />
  </div>
);

export default hot(module)(App);
