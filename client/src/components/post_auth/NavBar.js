import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = ({ selected }) => {
    const NavSelect = (selector) => selected === selector ? 'red-text' : '';
    
    return (
        <>
            <header className="grid-1 mobile-header">
                <Link to="/app/" className="grid-2 logo-container">
                    <img src="../assets/TrackoutLogo.svg" alt="Trackout Logo" />
                    <h1>TRACK<span>OUT</span></h1>
                </Link>
                <nav className="main-nav mobile-hide">
                    <ul>
                        <li className={`${NavSelect('dashboard')}`}><Link to="/app/">DASHBOARD</Link></li>
                        <li className={`${NavSelect('track')}`}><Link to="/app/track">TRACK</Link></li>
                        <li className={`${NavSelect('logs')}`}><Link to="/app/logs">LOGS</Link></li>
                        <li className={`${NavSelect('templates')}`}><Link to="/app/templates">TEMPLATES</Link></li>
                    </ul>
                </nav>
                <div className="mobile-hide">
                    <p>
                        © 2021 Zaid Allam
                    </p>
                </div>
                <Link to="/" className="mobile-only logout">Log Out</Link>
            </header>
        </>
    )
}