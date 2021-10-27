import React from 'react';
import { Provider } from "react-redux";
import './custom.css'
import store from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppSwitch from './AppSwitch';

function App() {
  return (
    <Router>
      <AppSwitch />
    </Router>
  );
}

export default () => (
  <Provider store={store}>
      <App />
  </Provider>
)
