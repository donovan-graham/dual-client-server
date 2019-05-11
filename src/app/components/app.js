import React from 'react';
import { hot } from 'react-hot-loader';
import Counter from './counter';

const App = ({ role }) => (
  <div>
    <h1>
      It works for any <strong style={{ color: 'red' }}>{role}</strong>
    </h1>
    <Counter />
  </div>
);

export default hot(module)(App);
