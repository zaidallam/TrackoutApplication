import React, {useState, useContext, useEffect} from 'react';
import { Context } from '../../../Context';
import axios from 'axios';

export const Log = ( { workout, deleteConfirmStyle, setDeleteConfirmStyle, setDeleteFailStyle, setSourceLog, sourceLog, clearDateRange } ) => {

    const [logEntry, setLogEntry] = useState([]);

    const getDate = () => {
        const date = `${workout.date.split('-')[1]}-${workout.date.split('-')[2]}-${workout.date.split('-')[0]}`;
        return date;
    }
    
    const getDay = () => {
        const dateString = getDate();
        const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        const d = new Date(dateString);
        const dayName = days[d.getDay()];
        return dayName;
    }

    const getWorkoutTypes = () => {

        const types = [];
        if (workout.main.filter(exerciseType => exerciseType.type === 'strength').length > 0) types.push('STRENGTH');
        if (workout.main.filter(exerciseType => exerciseType.type === 'cardio').length > 0) types.push('CARDIO');
        if (workout.mobility.length > 0) types.push('MOBILITY');

        if (types.length === 1) return types[0]
        if (types.length === 2) {
            const returnString = `${types[0]}, ${types[1]}`
            return returnString
        } else if (types.length === 3) {
            const returnString = `${types[0]}, ${types[1]}, ${types[2]}`
            return returnString
        } else {
            const returnString = `WARMUP/COOLDOWN`
            return returnString
        }

    }
    
    const getStatus = () => workout.status.toUpperCase()

    const getDuration = () => {
        let minutes = parseInt(workout.minutes) % 60;
        minutes = minutes < 10 ? `0${minutes}` : minutes;  
        const duration = `${parseInt(workout.hours) + parseInt(parseInt(workout.minutes) / 60)}:${minutes}`
        return duration;
    }

    return (
        <>
        <div className="log-container grid-1" onClick={ () => { setLogEntry([workout]) } }>
            <div className="title-container"><p className="log-title">{workout.title ? workout.title : `WORKOUT ON ${getDate()}`}</p></div>
            <div className="log-content flex-row">
                <p className="log-day">{getDay()}</p>
                <p className="log-date">{getDate()}</p>
                <p className="log-duration">{getDuration()}</p>
            </div>
            <div className="log-content flex-row">
                <p className="log-workout-type">{getWorkoutTypes()}</p>
            </div>
            <div className="log-content flex-row">
                <p className="log-status">STATUS: {getStatus()}</p>
            </div>
        </div>

        { logEntry.map( workout => <LogWindow  workout={workout} setLogEntry={setLogEntry} getDate={getDate} getDuration={getDuration} key={workout._id} deleteConfirmStyle={deleteConfirmStyle} setDeleteConfirmStyle={setDeleteConfirmStyle} setDeleteFailStyle={setDeleteFailStyle} sourceLog={sourceLog} setSourceLog={setSourceLog} clearDateRange={clearDateRange}/> )}
        
        </>
    )
}

export const LogWindow = ( { workout, setLogEntry, getDate, getDuration, deleteConfirmStyle, setDeleteConfirmStyle, setDeleteFailStyle, sourceLog, setSourceLog, clearDateRange } ) => {

    const { authUser} = useContext(Context);
    

    const deleteLog = () => {
        axios({
            method: 'DELETE',
            data: {_id: workout._id},
            withCredentials: true,
            url: `https://api.trackoutapp.com/users/${authUser}?resource=logs`
        })
        .then((res) => {
            setTimeout( () => setDeleteConfirmStyle('hide'), 5000); 
            clearDateRange();
            setSourceLog(sourceLog.filter( log => log._id !== workout._id));
        })
        .catch(() => {
            setDeleteFailStyle('');
            setTimeout( () => setDeleteFailStyle('hide'), 5000); 
        });
    }

    return (
        <>
        <div className='log-view-window-container fade-in'>
            <img src="../assets/ExitButtonWhite.svg" className="mobile-only fade-in" alt="Exit" id="exit-button-mobile" onClick={ () => setLogEntry([]) }/>
            <div className="log-view-window">
                <img src="../assets/ExitButton.svg" className="mobile-hide" alt="Exit" id="exit-button" onClick={ () => setLogEntry([]) }/>
                <h2>{`${workout.title ? workout.title : `Workout On ${getDate()}`}`}</h2>
                <p>{`${workout.status.toUpperCase()}, ${getDate()}${workout.hours || workout.minutes ? `, Duration Of ${getDuration()}` : '' }.`}<br />
                    {
                        (() => {if (workout.notes) return (<><strong>NOTES: </strong> {`${workout.notes}`}</>)})()
                    } 
                </p>

                {
                    (() => {
                        if (workout.warmup.length) return (
                            <div>
                            <h3>WARMUP</h3>
                            {workout.warmup.map( exercise => (
                                    <p>{
                                        `${exercise.name ? `${exercise.name}` : ''}${exercise.weight ? `, ${exercise.weight}` : ''}${exercise.weightUnits ? ` ${exercise.weightUnits}` : ''}${exercise.vol ? `, ${exercise.vol}` : ''}${exercise.volUnits ? ` ${exercise.volUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}`
                                    }</p>
                                ) 
                            )}
                            </div>
                        );
                    })()
                }

                {
                    (() => {
                        if (workout.main.length) return (
                            <>
                            {workout.main.map( exerciseType => {
                                return (
                                    <div>
                                        <h3>{exerciseType.type.toUpperCase()}</h3>
                                        { (() => {
                                                    if (exerciseType.type === 'strength') {
                                                        return exerciseType.exercises.map( exercise => (
                                                                <p>{
                                                                    `${exercise.name ? `${exercise.name}` : ''}${exercise.weight ? `, ${exercise.weight}` : ''}${exercise.weightUnits ? ` ${exercise.weightUnits}` : ''}${exercise.vol ? `, ${exercise.vol}` : ''}${exercise.volUnits ? ` ${exercise.volUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}${exercise.setRest ? `, ${exercise.setRest} ${exercise.restUnits ? exercise.restUnits : ''} rest between sets` : ''}${exercise.finalRest ? `, ${exercise.finalRest} ${exercise.restUnits ? exercise.restUnits : ''} final rest` : ''}`
                                                                }</p>
                                                            )
                                                        )
                                                    } else if (exerciseType.type === 'cardio') {
                                                        return exerciseType.exercises.map( exercise => (
                                                            <p>{
                                                                `${exercise.name ? `${exercise.name}` : ''}${exercise.distance ? `, ${exercise.distance}` : ''}${exercise.distanceUnits ? ` ${exercise.distanceUnits}` : ''}${exercise.paceMin ? `, ${parseInt(exercise.paceMin) + parseInt(parseInt(exercise.paceSec ? exercise.paceSec : 0) / 60)}` : ''}${exercise.paceSec ? `:${exercise.paceSec % 60}` : ':00'}${exercise.distanceUnits ? ` per ${exercise.distanceUnits === 'mi' ? 'mi' : 'km'}` : ''}`
                                                            }</p>
                                                        )
                                                    )
                                                    }
                                                    
                                                })()
                                        }
                                    </div>
                                )
                            })}
                            </>
                        );
                    })()
                }
                
                {
                    (() => {
                        if (workout.cooldown.length) return (
                            <div>
                                <h3>COOLDOWN</h3>
                                {workout.cooldown.map( exercise => (
                                        <p>{
                                            `${exercise.name ? `${exercise.name}` : ''}${exercise.weight ? `, ${exercise.weight}` : ''}${exercise.weightUnits ? ` ${exercise.weightUnits}` : ''}${exercise.vol ? `, ${exercise.vol}` : ''}${exercise.volUnits ? ` ${exercise.volUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}`
                                        }</p>
                                    ) 
                                )}
                            </div>
                        );
                    })()
                }

                {
                    (() => {
                        if (workout.mobility.length) return (
                            <div>
                                <h3>MOBILITY</h3>
                                {workout.mobility.map( exercise => (
                                    <p>{
                                        `${exercise.name ? `${exercise.name}` : ''}${exercise.time ? `, ${exercise.time}` : ''}${exercise.timeUnits ? ` ${exercise.timeUnits}` : ''}${exercise.sets ? `, ${exercise.sets} sets` : ''}`
                                    }</p>
                                ) 
                            )}
                            </div>
                        );
                    })()
                }

            </div>
            
            <div className="delete-log flex-row">
                <button className="fade-in" onClick={ () => setDeleteConfirmStyle('')}>DELETE LOG</button>
                <p className={deleteConfirmStyle}>ARE YOU SURE?</p>
                <button className={deleteConfirmStyle} onClick={ () => {deleteLog(); setLogEntry([])}}>YES</button>
                <button className={deleteConfirmStyle} onClick={ () => setDeleteConfirmStyle('hide')}>NO</button>
            </div>

        </div>
        </>
    )
}