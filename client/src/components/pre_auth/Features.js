import React, { useState, useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../../Context'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
import '../../css/pre_auth/InfoPages.css'
import '../../css/pre_auth/Features.css'

export const Features = () => {

    const { isAuth } = useContext(Context);

    if(isAuth) {
        return <Redirect to='/app' />
    } else {
        return (
            <>
            <div className="info-page grid-1 page-container" id="Features">
                <NavBar selected="features" />
                <div className="content-container fade-in">
                    <h1>FEATURES</h1>
                    <section className="grid-2 page-content">
                        <div className="feature">
                            <h2>LOG YOUR TRAINING</h2>
                            <div>
                                <img alt="" src="./assets/Feature1.svg" />
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                        <div className="feature">
                            <h2>CREATE WORKOUTS</h2>
                            <div>
                                <img alt="" src="./assets/Feature2.svg" />
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                        <div className="feature">
                            <h2>TRACK YOUR PROGRESS</h2>
                            <div>
                                <img alt="" src="./assets/Feature3.svg" />
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
            </>
        )
    }
}