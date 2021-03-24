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

    const { isAuth, logout, authUser, setIsLoading } = useContext(Context);
    const [sourceLog, setSourceLog] = useState([]);
    const [logPool, setLogPool] = useState([])
    const [activeLog, setActiveLog] = useState([]);

    const [totalPages, setTotalPages] = useState(1);
    const [selectedPage, setSelectedPage] = useState(1);

    const [selectedDateRange, setSelectedDateRange] = useState({from: '', to: ''})

    const [deleteConfirmStyle, setDeleteConfirmStyle] = useState('hide');
    const [deleteFailStyle, setDeleteFailStyle] = useState('hide');

    const fetchWorkoutLog = () => {
        setIsLoading(true);
        axios({
            method: 'GET',
            withCredentials: true,
            url: `localhost:5000/users/${authUser}?resource=logs`
        })
        .then((res) => {
            setSourceLog(res.data.reverse());
            setIsLoading(false);
        })
        .catch(() => {
            console.log('fetching failed');
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchWorkoutLog()
    }, []);

    useEffect( () => {
        setLogPool(sourceLog)
        setActiveLog(sourceLog.slice(0, 9));
        setTotalPages(Math.ceil(sourceLog.length / 9));
    }, [sourceLog] );

    const switchPage = (page) => {
        setActiveLog(logPool.slice((page - 1)*9, (page - 1)*9+9));
    }

    const applyDateRange = () => {
        if (!selectedDateRange.from || !selectedDateRange.to) {
            return null;
        }
        const from = new Date(selectedDateRange.from);
        const to = new Date(selectedDateRange.to);
        let matchingWorkouts = [];
        matchingWorkouts = sourceLog.filter( workout => {
            let workoutDate = new Date(workout.date);
            return (workoutDate >= from && workoutDate <= to);
        });
        matchingWorkouts.sort((a, b) => {
            let c = new Date(a.date);
            let d = new Date(b.date);
            return c-d;
        });
        matchingWorkouts.reverse()
        setLogPool(matchingWorkouts);
        setActiveLog(matchingWorkouts.slice(0, 9));
        Array.from(document.querySelectorAll("#page-select")).forEach(
            input => (input.value = 1)
        );
        setSelectedPage(1);
        setTotalPages(Math.ceil(matchingWorkouts.length/9))
    }

    const clearDateRange = () => {
        setLogPool(sourceLog)
        setActiveLog(sourceLog.slice(0, 9));
        setTotalPages(Math.ceil(sourceLog.length / 9));
        Array.from(document.querySelectorAll("#page-select")).forEach(
            input => (input.value = 1)
        );
        setSelectedPage(1);
        Array.from(document.querySelectorAll("#from-date")).forEach(
            input => (input.value = '')
        );
        Array.from(document.querySelectorAll("#to-date")).forEach(
            input => (input.value = '')
        );
        setSelectedDateRange({from: '', to: ''});
    }

    if (isAuth) {
        return (
            <>
            <div className="grid-2 page-container" id="logs">
                <NavBar selected="logs" />
                <section className="content-section grid-1 fade-in">
                    <h2>LOGS</h2>
                    <div className="filters flex-row">
                        <label htmlFor="from-date">FROM:</label><br className="mobile-only" />
                        <input type="date" id="from-date" name="from-date" onChange={ e => setSelectedDateRange({ from: e.target.value, to: selectedDateRange.to }) }/><br className="mobile-only" />
                        <label htmlFor="to-date">TO:</label><br className="mobile-only" />
                        <input type="date" id="to-date" name="to-date" onChange={ e => setSelectedDateRange({ from: selectedDateRange.from, to: e.target.value }) }/>
                        <button onClick={ e => { e.preventDefault(); applyDateRange() } }>APPLY</button><button onClick={ e => { e.preventDefault(); clearDateRange() } }>CLEAR</button><br className="mobile-only" />
                        <label htmlFor="page-select">PAGE</label>
                        <input type="number" id="page-select" name="page-select" defaultValue='1' onChange={ e => setSelectedPage(e.target.value)} />
                        <label htmlFor="page-select">OF {totalPages}</label>
                        <button onClick={ e => { e.preventDefault(); switchPage(selectedPage) } }>GO</button><br />
                        <div className={deleteConfirmStyle}>LOG DELETED</div>
                        <div className={deleteFailStyle}>ERROR: LOG NOT DELETED</div>
                    </div>
                    <div className="logs-list grid-3">

                        {activeLog.map(workout => <Log workout={workout} key={workout._id} deleteConfirmStyle={deleteConfirmStyle} setDeleteConfirmStyle={setDeleteConfirmStyle} setDeleteFailStyle={setDeleteFailStyle} setSourceLog={setSourceLog}sourceLog={sourceLog} clearDateRange={clearDateRange}/>)}

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