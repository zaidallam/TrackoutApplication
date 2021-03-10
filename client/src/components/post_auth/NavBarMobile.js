import React from 'react'
import { Link } from 'react-router-dom'

export const NavBarMobile = () => {    
    return (
        <>
            <nav className="mobile-only mobile-nav">
                <div>
                    <Link to="/app/"><img src="../assets/Dashboard.svg" alt="Dashboard" /></Link>
                    <Link to="/app/track"><img src="../assets/Track.svg" alt="Track" /></Link>
                    <Link to="/app/logs"><img src="../assets/Logs.svg" alt="Logs" /></Link>
                    <Link to="/app/templates"><img src="../assets/Templates.svg" alt="Templates" /></Link>
                </div>
            </nav>
        </>
    )
}