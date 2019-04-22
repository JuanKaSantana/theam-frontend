import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './redux/store/configureStore';
import AppRoutes from './routes';

const store = configureStore();

render((
    <Provider store={store}>
        <Router>
            <AppRoutes />
        </Router>
    </Provider>
), document.getElementById('root'));
