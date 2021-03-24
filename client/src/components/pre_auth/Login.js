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
            url: "https://trackoutapp.com/login"
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
                    <p style={{width:'75%', margin: 'auto', backgroundColor:'#FF000088', color: 'white', fontSize: '30px', textAlign: 'center', marginTop: '10px'}}>WARNING: This application is a prototype and security features are still under development. The connection made to the server when you sign up or log in is NOT YET SECURED. This means that, for the moment, you SHOULD NOT use a password here that you use anywhere else.</p>
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