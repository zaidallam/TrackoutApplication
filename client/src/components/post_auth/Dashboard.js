import React, { useState, useContext } from 'react'
import { Context } from '../../Context'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { Link, Redirect } from 'react-router-dom'
import '../../css/post_auth/Dashboard.css'
import '../../css/post_auth/General.css'

export const Dashboard = () => {    
    
    const { isAuth, logout} = useContext(Context)


    if(isAuth) {
        return (
            <>
            <div className="grid-2 page-container" id="dashboard">
                <NavBar selected="dashboard"/>
                <section className="content-section grid-1 fade-in">
                    <h2>DASHBOARD</h2>
                    <nav className="mobile-hide">
                        <ul>
                            <li className="red-text"><Link onClick={(e) => {e.preventDefault(); logout()}} to="/">Log Out</Link></li>
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
    } else {
        return <Redirect to="/" />
    }
}