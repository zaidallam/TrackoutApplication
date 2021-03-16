import React, { useState, useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../../Context'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import '../../css/pre_auth/SecondaryPages.css'
import '../../css/pre_auth/Support.css'

export const Support = () => {
    
    const { isAuth } = useContext(Context);
    
    if(isAuth) {
        return <Redirect to='/app' />
    } else {
        return (
            <>
            <div className="secondary-page grid-1 page-container" id="Support">
                <NavBar selected="support"/>
                <div className="content-container fade-in">
                    <h1>SUPPORT</h1>
                    <section className="page-content">
                        <h2>Please fill out the form below to contact support</h2>
                        <form method="post" id="contact">
                            <div>
                                <input className="input-area" type="text" id="name" name="name" required maxlength="50" placeholder="Full Name" />
                            </div>
                            <div>
                                <input className="input-area" type="email" id="email" name="email" required maxlength="50" placeholder="Email Address" />
                            </div>
                            <div>
                                <textarea className="contact-message" type="textarea" name="message" id="message" placeholder="Your Message Here" maxlength="6000" rows="7" />
                            </div>
                            <button type="submit" className="form-submit-btn" id="contactUsButton">SEND</button>
                        </form>
                    </section>
                </div>
                <Footer />
            </div>
            </>
        )
    }
}