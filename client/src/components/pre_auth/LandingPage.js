import React, { useState, useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../../Context'
import { Link } from 'react-router-dom'
import '../../css/pre_auth/HomePage.css';

export const LandingPage = () => {
  
  const { isAuth } = useContext(Context);

  if(isAuth) {
    return <Redirect to='/app' />
  } else {
    return (
      <>
      <div className="grid-2 page-container fade-in" id="home-page">
        <header className="grid-1">
          <Link to="/" className="grid-2 logo-container slide-up">
            <img src="./assets/TrackoutLogo.svg" alt="Trackout Logo"/>
            <h1>TRACK<span>OUT</span></h1>
          </Link>
          <nav className="main-nav slide-up">
            <ul>
              <li className="red-text mobile-only"><Link to="/login">LOG IN</Link></li>
              <li className="red-text mobile-only"><Link to="/signup">SIGN UP</Link></li>
              <li className="red-text"><Link to="/features">FEATURES</Link></li>
              <li className="red-text"><Link to="/about">ABOUT</Link></li>
              <li><Link to="/contact">CONTACT</Link></li>
              <li><Link to="/support">SUPPORT</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </nav>
          <div>
            <p>
              © 2021 Zaid Allam
            </p>
            <nav>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms and Conditions</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <section className="image-section flex-row mobile-hide">
          <nav className="sign-in-nav-animation">
            <ul className="flex-row">
              <li><Link to="/login">Log In</Link></li>
              <li className="red-text"><Link to="/signup">Sign Up</Link></li>
            </ul>
          </nav>
          <h2 className="slide-up">TRACK YOUR <span>TRAINING</span></h2>
        </section>
      </div>
      </>
    )
  }
}