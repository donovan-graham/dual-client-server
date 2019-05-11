import React from 'react';
import ReactDOM from 'react-dom';

const renderApp = () => {
  const App = require('./components/app').default;
  ReactDOM.render(<App role={'Investor'} />, document.getElementById('root'));
};

renderApp();
module.hot.accept(renderApp);
