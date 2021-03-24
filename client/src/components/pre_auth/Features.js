import React, { useContext} from 'react'
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
                                <p>Data is power, what gets measured gets managed, and knowing where your fitness was is just as important as knowing where it currently is. That's why Trackout allows you to quickly and effectively log your workouts in a clean and organized fasion. When you're done logging a workout, simply go to your workout log to manage and view all of your training history!</p>
                            </div>
                        </div>
                        <div className="feature">
                            <h2>CREATE WORKOUT TEMPLATES</h2>
                            <div>
                                <img alt="" src="./assets/Feature2.svg" />
                                <p>Consistency is key, so let's face it: Training is often the same from week to week. By allowing you to create workout templates, Trackout saves you the hassle of having to remember and recite your workouts from session to session. Simply create a template, save it, and import it into your workouts as you're logging them. No more wasting time writing down the same thing over and over!</p>
                            </div>
                        </div>
                        <div className="feature">
                            <h2>TRACK YOUR PROGRESS</h2>
                            <div>
                                <img alt="" src="./assets/Feature3.svg" />
                                <p>Trackout shows you your most recent training, presents to you graphs about the history of your training, and lets you review past workouts. By allowing you to review your workouts, Trackout effectively lets you track your progress over time so that you know where you've been and can decide where you're going on your fitness journey!</p>
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