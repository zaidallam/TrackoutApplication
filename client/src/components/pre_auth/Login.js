import React from 'react'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import '../../css/pre_auth/SecondaryPages.css'
import '../../css/pre_auth/Login.css'

export const Login = () => {
    return (
        <>
        <div className="secondary-page grid-1 page-container" id="Login">
            <NavBar selected="none"/>
            <div className="content-container fade-in">
                <h1>LOG IN</h1>
                <section className="page-content">
                    <form method="post" id="contact">
                        <div>
                            <input className="input-area" type="text" id="email" name="email" maxLength="50" placeholder="Email" />
                        </div>
                        <div>
                            <input className="input-area" type="password" id="password" name="password" maxLength="50" placeholder="Password" />
                        </div>
                        <div className="error-message">
                            <p>Placeholder text</p>
                        </div>
                        <button className="form-submit-btn" id="logInButton">LOG IN</button>
                    </form>
                </section>
            </div>
            <Footer />
        </div>
        </>
    )
}