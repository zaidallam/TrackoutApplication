import React, { useState, useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../../Context'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import axios from 'axios';
import '../../css/pre_auth/SecondaryPages.css'
import '../../css/pre_auth/Login.css'

export const Login = () => {    
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("hide");
    const { setIsAuth, isAuth, setAuthUser, setIsLoading } = useContext(Context);

    const login = () => {
        setIsLoading(true);
        axios({
            method: 'POST',
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:5000/login"
        })
        .then((res) => {
            res.config.data = "hidden";
            console.log(res); 
            setLoginError("hide");
            setAuthUser(loginUsername);
            setIsAuth(true);
            setIsLoading(false);
        })
        .catch(() => {
            setLoginError("");
            setIsLoading(false);
        });
    }
    
    if (isAuth) {
        return <Redirect to='/app' />
    } else {
        return (
            <>
            <div className="secondary-page grid-1 page-container" id="Login">
                <NavBar selected="none"/>
                <div className="content-container fade-in">
                    <h1>LOG IN</h1>
                    <section className="page-content">
                        <form method="post" id="contact">
                            <div>
                                <input className="input-area" type="text" id="username" name="username" maxLength="50" placeholder="Email" onChange={e => setLoginUsername(e.target.value)}/>
                            </div>
                            <div>
                                <input className="input-area" type="password" id="password" name="password" maxLength="50" placeholder="Password" onChange={e => setLoginPassword(e.target.value)}/>
                            </div>
                            <div className={`error-message fade-in ${loginError}`}>
                                <p>Incorrect Login</p>
                            </div>
                            <button className="form-submit-btn" id="logInButton" onClick={(e) => {e.preventDefault(); login()}}>LOG IN</button>
                        </form>
                    </section>
                </div>
                <Footer />
            </div>
            </>
        )
    }

    
}