import React from 'react'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { Link } from 'react-router-dom'
import '../../css/post_auth/Logs.css'
import '../../css/post_auth/General.css'

export const Logs = () => {
    return (
        <>
        <div className="grid-2 page-container" id="logs">
            <NavBar selected="logs" />
            <section className="content-section grid-1 fade-in">
                <h2>LOGS</h2>
                <div className="filters flex-row">
                    <label htmlFor="from-date">FROM:</label><br className="mobile-only" />
                    <input type="date" id="from-date" name="from-date" /><br className="mobile-only" />
                    <label htmlFor="to-date">TO:</label><br className="mobile-only" />
                    <input type="date" id="to-date" name="to-date" /><br className="mobile-only" />
                    <button>APPLY</button>
                </div>
                <div className="logs-list grid-3">
                    <div className="log-container grid-1">
                        <p className="log-title">LOG</p>
                        <div className="log-content flex-row">
                            <p className="log-day">DAY</p>
                            <p className="log-date">DATE</p>
                            <p className="log-duration">DURATION</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-workout-type">STRENGTH, CARDIO</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-status">STATUS: COMPLETE</p>
                        </div>
                    </div>

                    <div className="log-container grid-1">
                        <p className="log-title">LOG</p>
                        <div className="log-content flex-row">
                            <p className="log-day">DAY</p>
                            <p className="log-date">DATE</p>
                            <p className="log-duration">DURATION</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-workout-type">STRENGTH, CARDIO</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-status">STATUS: COMPLETE</p>
                        </div>
                    </div>

                    <div className="log-container grid-1">
                        <p className="log-title">LOG</p>
                        <div className="log-content flex-row">
                            <p className="log-day">DAY</p>
                            <p className="log-date">DATE</p>
                            <p className="log-duration">DURATION</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-workout-type">STRENGTH, CARDIO</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-status">STATUS: COMPLETE</p>
                        </div>
                    </div>

                    <div className="log-container grid-1">
                        <p className="log-title">LOG</p>
                        <div className="log-content flex-row">
                            <p className="log-day">DAY</p>
                            <p className="log-date">DATE</p>
                            <p className="log-duration">DURATION</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-workout-type">STRENGTH, CARDIO</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-status">STATUS: COMPLETE</p>
                        </div>
                    </div>

                    <div className="log-container grid-1">
                        <p className="log-title">LOG</p>
                        <div className="log-content flex-row">
                            <p className="log-day">DAY</p>
                            <p className="log-date">DATE</p>
                            <p className="log-duration">DURATION</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-workout-type">STRENGTH, CARDIO</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-status">STATUS: COMPLETE</p>
                        </div>
                    </div>

                    <div className="log-container grid-1">
                        <p className="log-title">LOG</p>
                        <div className="log-content flex-row">
                            <p className="log-day">DAY</p>
                            <p className="log-date">DATE</p>
                            <p className="log-duration">DURATION</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-workout-type">STRENGTH, CARDIO</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-status">STATUS: COMPLETE</p>
                        </div>
                    </div>

                    <div className="log-container grid-1">
                        <p className="log-title">LOG</p>
                        <div className="log-content flex-row">
                            <p className="log-day">DAY</p>
                            <p className="log-date">DATE</p>
                            <p className="log-duration">DURATION</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-workout-type">STRENGTH, CARDIO</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-status">STATUS: COMPLETE</p>
                        </div>
                    </div>

                    <div className="log-container grid-1">
                        <p className="log-title">LOG</p>
                        <div className="log-content flex-row">
                            <p className="log-day">DAY</p>
                            <p className="log-date">DATE</p>
                            <p className="log-duration">DURATION</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-workout-type">STRENGTH, CARDIO</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-status">STATUS: COMPLETE</p>
                        </div>
                    </div>

                    <div className="log-container grid-1">
                        <p className="log-title">LOG</p>
                        <div className="log-content flex-row">
                            <p className="log-day">DAY</p>
                            <p className="log-date">DATE</p>
                            <p className="log-duration">DURATION</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-workout-type">STRENGTH, CARDIO</p>
                        </div>
                        <div className="log-content flex-row">
                            <p className="log-status">STATUS: COMPLETE</p>
                        </div>
                    </div>
                </div>
                <nav className="log-nav">
                    <ul className="flex-row">
                        <li className="nav-arrow"><img src="../assets/LeftArrow.svg" alt="previous page" /></li>
                        <li><span>1</span></li>
                        <li><span>2</span></li>
                        <li><span>3</span></li>
                        <li><span>4</span></li>
                        <li><span>5</span></li>
                        <li><span>...</span></li>
                        <li><span>10</span></li>
                        <li><span>11</span></li>
                        <li className="nav-arrow"><img src="../assets/RightArrow.svg" alt="next page" /></li>    
                    </ul>
                </nav>
                <nav className="mobile-hide">
                    <ul>
                        <li className="red-text log-out"><Link to="/">Log Out</Link></li>
                    </ul>
                </nav>
            </section>
            <NavBarMobile />
        </div>
        </>
    )
}