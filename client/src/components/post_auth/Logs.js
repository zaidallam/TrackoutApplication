import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../Context'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { Link, Redirect } from 'react-router-dom'
import { Log } from './helper_components/logs'
import axios from 'axios'
import '../../css/post_auth/Logs.css'
import '../../css/post_auth/General.css'

export const Logs = () => {

    const { isAuth, logout, authUser} = useContext(Context);
    const [workoutLog, setWorkoutLog] = useState([]);

    const fetchWorkoutLog = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/users/${authUser}?resource=logs`
        })
        .then((res) => {
            setWorkoutLog(res.data);
        })
        .catch(() => {
            console.log('fetching failed');
        });
    }

    useEffect(() => {
        fetchWorkoutLog()
    }, []);

    if (isAuth) {
        return (
            <>
            <div className="grid-2 page-container" id="logs">
                <NavBar selected="logs" />
                <section className="content-section grid-1 fade-in">
                    <h2>LOGS</h2>
                    <div className="filters flex-row">
                        <label htmlFor="from-date">FROM:</label><br className="mobile-only" />
                        <input type="date" id="from-date" name="from-date" /><br className="mobile-only" />
                        <label htmlFor="to-date">TO:</label><br className="mobile-only" />
                        <input type="date" id="to-date" name="to-date" />
                        <button>APPLY</button><br className="mobile-only" />
                        <label htmlFor="from-date">PAGE</label>
                        <input type="number" id="page-select" name="page-select" defaultValue='1'/>
                        <label htmlFor="from-date">OF 100</label>
                        <button>GO</button>
                    </div>
                    <div className="logs-list grid-3">

                        {workoutLog.map(workout => <Log workout={workout} key={workout._id}/>)}


                    </div>
                    <nav className="mobile-hide">
                        <ul>
                            <li className="red-text log-out"><Link onClick={(e) => {e.preventDefault(); logout()}} to="/">Log Out</Link></li>
                        </ul>
                    </nav>
                </section>
                <NavBarMobile />
            </div>
            </>
        )
    } else {
        return <Redirect to="/" />
    }
}