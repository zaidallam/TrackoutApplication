import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../Context'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { RecentWorkout } from './helper_components/dashboard'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../css/post_auth/Dashboard.css'
import '../../css/post_auth/General.css'
import Chart from 'chart.js'

export const Dashboard = () => {    
    
    const { isAuth, logout, authUser } = useContext(Context)
    const [ workouts, setWorkouts ] = useState([]);
    const [ recentWorkouts, setRecentWorkouts ] = useState([]);

    const fetchWorkouts = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: `https://api.trackoutapp.com/users/${authUser}?resource=logs`
        })
        .then((res) => {
            setWorkouts(res.data.reverse());
        })
        .catch(() => {
            console.log('fetching failed');
        });
    }

    useEffect( () => {
        if(authUser) {
            fetchWorkouts();
        }
    }, [authUser])

    useEffect( () => {
        let sortedWorkouts = workouts;
        sortedWorkouts.sort((a, b) => {
            let c = new Date(a.date);
            let d = new Date(b.date);
            return c-d;
        });
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        today = new Date(yyyy + '-' + mm + '-' + dd);
        sortedWorkouts = sortedWorkouts.filter( workout => {
            const workoutDate = new Date(workout.date); 
            return workoutDate <= today;
        } )
        sortedWorkouts.reverse()
        setRecentWorkouts(sortedWorkouts.slice(0, 3));
    }, [workouts])

    useEffect( () => {
        let ctx = document.getElementById('training-chart');
        if (ctx) {
            ctx = ctx.getContext('2d');
            let chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                    datasets: [{
                        label: 'Workouts of the past 12 weeks',
                        borderColor: '#FF0000',
                        data: [0, 10, 5, 2, 6, 7, 8, 3, 1, 7, 5, 20]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }, [])

    if(isAuth) {
        return (
            <>
            <div className="grid-2 page-container" id="dashboard">
                <NavBar selected="dashboard"/>
                <section className="content-section grid-1 fade-in">
                    <h2>DASHBOARD</h2>
                    <nav className="mobile-hide">
                        <ul>
                            <li className="red-text"><Link onClick={(e) => {e.preventDefault(); logout()}} to="/">Log Out</Link></li>
                        </ul>
                    </nav>
                    <div className="graph">
                        <canvas id="training-chart"></canvas>
                    </div>
                    <div className="recent-training grid-1">
                        <h3>RECENT TRAINING</h3>
                        <div className="grid-3 recent-workout-container">
                            {
                                (() => {
                                    if (recentWorkouts.length) {
                                        if (recentWorkouts.length === 3) {
                                            return (
                                                <>
                                                <RecentWorkout workout={recentWorkouts[0]}/>
                                                <RecentWorkout workout={recentWorkouts[1]}/>
                                                <RecentWorkout workout={recentWorkouts[2]}/>
                                                </>
                                            )
                                        } else if (recentWorkouts.length === 2) {
                                            return (
                                                <>
                                                <RecentWorkout workout={recentWorkouts[0]}/>
                                                <RecentWorkout workout={recentWorkouts[1]}/>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <>
                                                <RecentWorkout workout={recentWorkouts[0]}/>
                                                </>
                                            )
                                        }
                                    } 
                                })()
                            }
                        </div>
                    </div>
                </section>
                <NavBarMobile />
            </div>
            </>
        )
    } else {
        return <Redirect to="/" />
    }
}