import React, {useState, useContext} from 'react'

export const Log = ( { workout } ) => {
    
    const date = `${workout.date.split('-')[1]}-${workout.date.split('-')[2]}-${workout.date.split('-')[0]}`;
    const duration = `${parseInt(workout.hours) + parseInt(workout.minutes) % 60}:${parseInt(workout.minutes) % 60}`

    //don't forget to limit the length of the title that is displayed

    return (
        <>
        <div className="log-container grid-1">
            <div class="title-container"><p className="log-title">{workout.title ? workout.title : `WORKOUT ON ${date}`}</p></div>
            <div className="log-content flex-row">
                <p className="log-day">DAY</p>
                <p className="log-date">{date}</p>
                <p className="log-duration">{duration}</p>
            </div>
            <div className="log-content flex-row">
                <p className="log-workout-type">STRENGTH, CARDIO, MOBILITY</p>
            </div>
            <div className="log-content flex-row">
                <p className="log-status">STATUS: COMPLETE</p>
            </div>
        </div>
        </>
    )
}