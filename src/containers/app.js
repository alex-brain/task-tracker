import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './layout';
import store from '../store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  </Provider>
);

export default App;
