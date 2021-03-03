import './css/pre_auth/Normalize.css';
import './css/pre_auth/General.css';

import {BrowserRouter as Router, Route } from 'react-router-dom';

import { LandingPage } from './components/pre_auth/LandingPage';
import { Features } from './components/pre_auth/Features';
import { About } from './components/pre_auth/About';
import { Contact } from './components/pre_auth/Contact';
import { Support } from './components/pre_auth/Support';
import { FAQ } from './components/pre_auth/FAQ';
import { Login } from './components/pre_auth/Login';
import { Signup } from './components/pre_auth/Signup';


function App() {
  return (
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
      

    </Router>
  );
}

export default App;
