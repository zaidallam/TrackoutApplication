import React, { useState, useContext } from 'react'
import { Context } from '../../Context'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { Link, Redirect } from 'react-router-dom'
import '../../css/post_auth/Templates.css'
import '../../css/post_auth/General.css'

export const Templates = () => {

    const { isAuth, logout} = useContext(Context)
    
    if (isAuth) {
        return (
            <>
            <div className="grid-2 page-container" id="templates">
                <NavBar selected="templates"/>
                <section className="content-section grid-1 fade-in">
                    <div><h2>TEMPLATES</h2> <button className="new-template">NEW TEMPLATE</button></div>
                    <div className="filters flex-row">
                        <label htmlFor="type">TYPE:</label><br className="mobile-only" />
                        <select name="template-type" id="template-type">
                            <option value="warmup">Warmup</option>
                            <option value="strength">Strength</option>
                            <option value="cardio">Cardio</option>
                            <option value="mobility">Mobility</option>
                            <option value="cooldown">Cooldown</option>
                        </select>
                    </div>
                    <div className="templates-list grid-3">
                        <div className="template-container grid-1">
                            <p className="template-title">TEMPLATE</p>
                            <div className="template-content">
                                <p className="template-duration">CREATED: 8 MAR, 2021</p>
                            </div>
                            <div className="template-content flex-row">
                                <p className="template-workout-type">STRENGTH</p>
                            </div>
                        </div>

                        <div className="template-container grid-1">
                            <p className="template-title">TEMPLATE</p>
                            <div className="template-content">
                                <p className="template-duration">CREATED: 8 MAR, 2021</p>
                            </div>
                            <div className="template-content flex-row">
                                <p className="template-workout-type">STRENGTH</p>
                            </div>
                        </div>

                        <div className="template-container grid-1">
                            <p className="template-title">TEMPLATE</p>
                            <div className="template-content">
                                <p className="template-duration">CREATED: 8 MAR, 2021</p>
                            </div>
                            <div className="template-content flex-row">
                                <p className="template-workout-type">STRENGTH</p>
                            </div>
                        </div>

                        <div className="template-container grid-1">
                            <p className="template-title">TEMPLATE</p>
                            <div className="template-content">
                                <p className="template-duration">CREATED: 8 MAR, 2021</p>
                            </div>
                            <div className="template-content flex-row">
                                <p className="template-workout-type">STRENGTH</p>
                            </div>
                        </div>

                        <div className="template-container grid-1">
                            <p className="template-title">TEMPLATE</p>
                            <div className="template-content">
                                <p className="template-duration">CREATED: 8 MAR, 2021</p>
                            </div>
                            <div className="template-content flex-row">
                                <p className="template-workout-type">STRENGTH</p>
                            </div>
                        </div>

                        <div className="template-container grid-1">
                            <p className="template-title">TEMPLATE</p>
                            <div className="template-content">
                                <p className="template-duration">CREATED: 8 MAR, 2021</p>
                            </div>
                            <div className="template-content flex-row">
                                <p className="template-workout-type">STRENGTH</p>
                            </div>
                        </div>

                        <div className="template-container grid-1">
                            <p className="template-title">TEMPLATE</p>
                            <div className="template-content">
                                <p className="template-duration">CREATED: 8 MAR, 2021</p>
                            </div>
                            <div className="template-content flex-row">
                                <p className="template-workout-type">STRENGTH</p>
                            </div>
                        </div>

                        <div className="template-container grid-1">
                            <p className="template-title">TEMPLATE</p>
                            <div className="template-content">
                                <p className="template-duration">CREATED: 8 MAR, 2021</p>
                            </div>
                            <div className="template-content flex-row">
                                <p className="template-workout-type">STRENGTH</p>
                            </div>
                        </div>

                        <div className="template-container grid-1">
                            <p className="template-title">TEMPLATE</p>
                            <div className="template-content">
                                <p className="template-duration">CREATED: 8 MAR, 2021</p>
                            </div>
                            <div className="template-content flex-row">
                                <p className="template-workout-type">STRENGTH</p>
                            </div>
                        </div>

                    </div>
                    <nav className="template-nav">
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
                            <li className="red-text log-out"><Link onClick={(e) => {e.preventDefault(); logout()}} to="/">Log Out</Link></li>
                        </ul>
                    </nav>
                </section>
                <NavBarMobile />
            </div>
            </>
        )
    } else {
        return <Redirect to="/" />
    }
}