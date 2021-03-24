import React, { useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { Context } from '../../Context'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import '../../css/pre_auth/SecondaryPages.css'
import '../../css/pre_auth/FAQ.css'

export const FAQ = () => {
    
    const { isAuth } = useContext(Context);
    
    if(isAuth) {
        return <Redirect to='/app' />
    } else {
        return (
            <>
            <div className="secondary-page grid-1 page-container" id="FAQ">
                <NavBar selected="faq"/>
                <div className="content-container fade-in">
                    <h1>FAQ</h1>
                    <section className="page-content">
                        <h2>Coming soon!</h2>
                        <p>As the questions come in about Trackout, the most common ones will appear here for all to see!</p>
                    </section>
                </div>
                <Footer />
            </div>
            </>
        )
    }
}