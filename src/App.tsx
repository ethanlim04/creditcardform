import React from 'react';
import logo from './logo.svg';
import './App.css';
import './form.scss';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Submit from './Submit';
import getUser from './view';
import GetUID from './inputUid';

function App() {
  return (

    <Router>
      <div>
        <Routes>
          <Route path='/' Component={Submit}></Route>
          <Route path='/getUID' Component={GetUID}></Route>
          <Route path='/getUser/:uid' Component={getUser}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
