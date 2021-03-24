import React, { useContext} from 'react'
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
                            <p>This Trackout prototype was created by Zaid Allam to merge his two of his passions: fitness and programming. By creating this app, he made for himself an effective, clean, workout tracking app that fits all his needs exactly, while gaining valueable programming experience at the same time. The end result is something that anybody can use to track their training and take their fitness to new levels!</p>
                        </section>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
}
