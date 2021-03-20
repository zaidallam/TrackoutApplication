import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../Context'
import { NavBar } from './NavBar'
import { NavBarMobile } from './NavBarMobile'
import { Link, Redirect } from 'react-router-dom'
import { Log } from './helper_components/logs'
import axios from 'axios'
import '../../css/post_auth/Logs.css'
import '../../css/post_auth/General.css'
import { set } from 'js-cookie'

export const Logs = () => {

    const { isAuth, logout, authUser} = useContext(Context);
    const [workoutLog, setWorkoutLog] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeLog, setActiveLog] = useState([]);
    const [selectedPage, setSelectedPage] = useState(1);

    const fetchWorkoutLog = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/users/${authUser}?resource=logs`
        })
        .then((res) => {
            setWorkoutLog(res.data.reverse());
        })
        .catch(() => {
            console.log('fetching failed');
        });
    }

    useEffect(() => {
        fetchWorkoutLog()
    }, []);

    useEffect( () => {
        setActiveLog(workoutLog.slice((currentPage - 1)*9, (currentPage - 1)*9+9));
        setTotalPages(Math.ceil(workoutLog.length / 9));
    }, [workoutLog] );

    useEffect( () => {
        setActiveLog(workoutLog.slice((currentPage - 1)*9, (currentPage - 1)*9+9));
    }, [currentPage] );

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
                        <input type="number" id="page-select" name="page-select" defaultValue='1' onChange={ e => setSelectedPage(e.target.value)}/>
                        <label htmlFor="from-date">OF {totalPages}</label>
                        <button onClick={ e => { e.preventDefault(); setCurrentPage(selectedPage) } }>GO</button>
                    </div>
                    <div className="logs-list grid-3">

                        {activeLog.map(workout => <Log workout={workout} key={workout._id}/>)}


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