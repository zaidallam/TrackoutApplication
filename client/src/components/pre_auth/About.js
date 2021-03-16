import React, { useState, useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../../Context'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
import '../../css/pre_auth/InfoPages.css'
import '../../css/pre_auth/About.css'

export const About = () => {
    
    const { isAuth } = useContext(Context);

    if(isAuth) {
        return <Redirect to='/app' />
    } else {
        return (
            <>
                <div className="info-page grid-1 page-container" id="About">
                    <NavBar selected="about"/>
                    <div className="content-container fade-in">
                        <h1>ABOUT</h1>
                        <section className="page-content">
                            <h2>THE STORY OF TRACKOUT</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </section>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
}
