import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';


import "semantic-ui-css/semantic.min.css";

const rootElement = document.getElementById('root');

ReactDOM.render(
  <HashRouter basename={'/'}>
    <App />
  </HashRouter>,
  rootElement);
