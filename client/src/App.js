import logo from './logo.svg';
import './App.css';
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Signup from './components/auth/SignUp';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import { UserContext } from './UserContext';
import MusicPlay from './components/musicPlay/MusicPlay';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <Router>
      <div className="app">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/music/:music_id' component={MusicPlay}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={Signup}></Route>
        </Switch>

      </UserContext.Provider>

      </div>
    </Router>
  )
}

export default App;
