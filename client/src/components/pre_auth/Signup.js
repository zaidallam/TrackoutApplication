import React, { useState, useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../../Context'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import axios from 'axios';
import '../../css/pre_auth/SecondaryPages.css'
import '../../css/pre_auth/Login.css'

export const Signup = () => {
    
    const [signupName, setSignupName] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupPasswordConf, setSignupPasswordConf] = useState("");
    const [signupError, setSignupError] = useState({style: {display: 'none'}, message: 'Error'});
    const [signupComplete, setSignupComplete] = useState(false);
    const { isAuth } = useContext(Context);

    const signup = () => {
        axios({
            method: 'POST',
            data: {
                name: signupName,
                username: signupUsername,
                password: signupPassword,
                passwordConf: signupPasswordConf
            },
            withCredentials: true,
            url: "http://localhost:5000/users/"
        })
        .then((res) => {
            res.config.data = "hidden";
            console.log(res);
            setSignupError({style: {display: 'none'}, message: 'Error'});
            setSignupComplete(true)
        })
        .catch((err) => {
            setSignupError({style: {display: 'block'}, message: err.response.data.message});
        });
    }
    
    if (isAuth) {
        return <Redirect to='/app' />
    } else if (signupComplete) { 
        return <Redirect to='/login' />
    } else {
        return (
            <>
            <div className="secondary-page grid-1 page-container" id="Login">
                <NavBar selected="none"/>
                <div className="content-container fade-in">
                    <h1>SIGN UP</h1>
                    <section className="page-content">
                        <form method="post" id="contact">
                            <div>
                                <input className="input-area" type="text" id="name" name="name" maxLength="50" placeholder="Name" onChange={e => setSignupName(e.target.value)}/>
                            </div>
                            <div>
                                <input className="input-area" type="text" id="email" name="email" maxLength="50" placeholder="Email" onChange={e => setSignupUsername(e.target.value)}/>
                            </div>
                            <div>
                                <input className="input-area" type="password" id="password" name="password" maxLength="50" placeholder="Password" onChange={e => setSignupPassword(e.target.value)}/>
                            </div>
                            <div>
                                <input className="input-area" type="password" id="passwordConf" name="passwordConf" maxLength="50" placeholder="Re-Type Password" onChange={e => setSignupPasswordConf(e.target.value)}/>
                            </div>
                            <div style={signupError.style} className="error-message">
                                <p>{signupError.message}</p>
                            </div>                        
                            <button className="form-submit-btn" id="logInButton" onClick={(e) => {e.preventDefault(); signup()}}>SIGN UP</button>
                        </form>
                    </section>
                </div>
                <Footer />
            </div>
            </>
        )
    }
}