import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Signup from './components/auth/SignUp';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Page404 from './components/error/404';
import { UserContext } from './UserContext';
import MusicPlay from './components/musicPlay/MusicPlay';

function App() {
  const [user, setUser] = useState(null);
  console.log(user)
  useEffect(() => {
    // clearInterval(interval)
    const verifyUser = async () => {
      try {
        console.log("trying")
        const res = await fetch(`${process.env.REACT_APP_SERVER_IP}/verifyuser`, {
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        console.log(data)
        await setUser(data)
        console.log(user)
      } catch (err) {
        console.log(err)
      }
    }
    verifyUser()
  }, [])

  return (
    <Router>
      <div className="app">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/music/:music_id' component={MusicPlay}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/signup' component={Signup}></Route>
            <Route component={Page404}></Route>
          </Switch>

        </UserContext.Provider>

      </div>
    </Router>
  )
}

export default App;
