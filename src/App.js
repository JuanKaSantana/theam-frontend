import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './sass/App.scss';

const App = ({ children }) => <Router>{children}</Router>;

export default App;
