import React from 'react'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { Link } from 'react-router-dom'
import '../../css/post_auth/Dashboard.css'
import '../../css/post_auth/General.css'

export const Dashboard = () => {
    return (
        <>
        <div className="grid-2 page-container" id="dashboard">
            <NavBar selected="dashboard"/>
            <section className="content-section grid-1 fade-in">
                <h2>DASHBOARD</h2>
                <nav className="mobile-hide">
                    <ul>
                        <li className="red-text"><Link to="/">Log Out</Link></li>
                    </ul>
                </nav>
                <div className="graph">
                    GRAPH
                </div>
                <div className="recent-training">
                    <h3>RECENT TRAINING</h3>
                </div>
            </section>
            <NavBarMobile />
        </div>
        </>
    )
}