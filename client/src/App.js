import './css/pre_auth/Normalize.css';
import './css/pre_auth/General.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Context } from './Context'
import { useState, useEffect } from 'react'

import { LandingPage } from './components/pre_auth/LandingPage';
import { Features } from './components/pre_auth/Features';
import { About } from './components/pre_auth/About';
import { Contact } from './components/pre_auth/Contact';
import { Support } from './components/pre_auth/Support';
import { FAQ } from './components/pre_auth/FAQ';
import { Login } from './components/pre_auth/Login';
import { Signup } from './components/pre_auth/Signup';
import { Dashboard } from './components/post_auth/Dashboard';
import { Track } from './components/post_auth/Track';
import { Logs } from './components/post_auth/Logs';
import { Templates } from './components/post_auth/Templates';

import axios from 'axios';


function App() {
  
  const [isAuth, setIsAuth] = useState(false);

  const logout = () => {
    axios({
      method: 'DELETE',
      withCredentials: true,
      url: "http://localhost:5000/logout"
    })
    .then((res) => {
      console.log(res);
      setIsAuth(false);
    })
    .catch((err) => {
      console.log(err);
      setIsAuth(false);
    });
  }

  const checkAuth = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: "http://localhost:5000/checkauth"
    })
    .then((res) => {
      if (res.data.authenticated === true) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      console.log(res);
    })
    .catch((err) => {
      setIsAuth(false);
      console.log(err);
    });
  }

  useEffect(() => {
    checkAuth()
  }, []);

  const contextVals = { 
    logout: logout, 
    checkAuth: checkAuth, 
    isAuth: isAuth, 
    setIsAuth: setIsAuth 
  }

  return (
    <Context.Provider value={ contextVals }>
      <Router>
        {/* Pre Auth Routes */}
        <Route path='/' exact component={LandingPage}/>
        <Route path='/features' exact component={Features}/>
        <Route path='/about' exact component={About}/>
        <Route path='/contact' exact component={Contact}/>
        <Route path='/support' exact component={Support}/>
        <Route path='/faq' exact component={FAQ}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/signup' exact component={Signup}/>
        <Route path='/privacy' component={() => { 
        window.location.href = 'https://www.privacypolicygenerator.info/live.php?token=mnGgnN9AJJIj0uAtvD4XaBZysCZ44CIG'; 
        return null;
        }}/>
        <Route path='/terms' component={() => { 
        window.location.href = 'https://www.termsandconditionsgenerator.com/live.php?token=ocgJCZ8MBXF0SRsNimdj9zCixNDgu9h0'; 
        return null;
        }}/>

        {/* Post Auth Routes */}
        <Route path='/app/' exact component={Dashboard}/>
        <Route path='/app/track' exact component={Track}/>
        <Route path='/app/logs' exact component={Logs}/>
        <Route path='/app/templates' exact component={Templates}/>
      </Router>
    </Context.Provider>
  );
}

export default App;
