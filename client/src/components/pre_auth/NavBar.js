import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = ({ selected }) => {
    const NavSelect = (selector) => selected === selector ? '' : 'hide';
    
    return (
        <>
            <header className="grid-3">
                <Link to="/" className="logo-container">
                    <img src="./assets/TrackoutLogo.svg" alt="Trackout Logo" />
                </Link>
                <nav className="home-nav">
                    <div className="flex-row">
                        <div className="flex-row"><img alt="" className={`nav-selector ${NavSelect('features')} mobile-hide nav-selector-animation`} src="./assets/selector.svg"/><Link to="/features">FEATURES</Link></div>
                        <div className="flex-row"><img alt="" className={`nav-selector ${NavSelect('about')} mobile-hide nav-selector-animation`} src="./assets/selector.svg"/><Link to="/about">ABOUT</Link></div>
                        <div className="flex-row red-text"><img alt="" className={`nav-selector-white ${NavSelect('support')} mobile-hide nav-selector-animation`} src="./assets/selectorWhite.svg"/><Link to="/support">SUPPORT</Link></div>
                        <div className="flex-row red-text"><img alt="" className={`nav-selector-white ${NavSelect('contact')} mobile-hide nav-selector-animation`} src="./assets/selectorWhite.svg"/><Link to="/contact">CONTACT</Link></div>
                        <div className="flex-row red-text"><img alt="" className={`nav-selector-white ${NavSelect('faq')} mobile-hide nav-selector-animation`} src="./assets/selectorWhite.svg"/><Link to="/faq">FAQ</Link></div>
                    </div>
                </nav>
                <nav className="sign-in-nav">
                    <ul className="flex-row">
                        <li><Link to="/login">LOG IN</Link></li>
                        <li className="red-text"><Link to="/signup">SIGN UP</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}